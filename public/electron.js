const path = require("path");
const { app, BrowserWindow, screen, ipcMain, dialog, net } = require("electron");
const isDev = require("electron-is-dev");
const fs = require('fs');
const request = require('request');
const config = require(path.normalize('../config.json'));
const N_API_URL = 'https://naveropenapi.apigw.ntruss.com/vision/v1/';
const UPLOAD_URL = 'http://cms.innospeech.com/api/uploadUniversalInterview.api';

function createWindow() {
  let mainWindow = null;
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  console.log(width);
  console.log(isDev);
  // console.log(config.host);
  // Create the browser window.
  // const win = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   kiosk: false,
  //   frame: true
  // });
  try {
    if (width === 1920) { 
      mainWindow = new BrowserWindow({
      minWidth: 1920,
      height: 1350,
      webPreferences: {
        nodeIntegration: true,
        worldSafeExecuteJavaScript: true, 
        contextIsolation: false
        //contextIsolation: true
        //preload: path.join(__dirname, 'preload.js'),
      },
      kiosk: false,
      frame: true,
      alwaysOnTop: false   //항상맨위 
    })
    mainWindow.loadURL(
      isDev
        ? "http://localhost:3000"
       : `file://${path.join(__dirname, "../build/index.html")}`
      //`file://${path.join(__dirname, "../build/index.html")}`
    );
    //console.log(mainWindow);
  }else {
      mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      },
      kiosk: true,
      frame: false
    })
    mainWindow.loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
      //`file://${path.join(__dirname, "../build/index.html")}`
    );
  }
  } catch (error) {
    console.log(error);
  }
  

  // and load the index.html of the app.
  // win.loadFile("index.html");
  

  // Open the DevTools.
  if (true) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}
//안면인식 호출
ipcMain.on('asynchronous-message', async (event, arg) => {
  fs.writeFileSync('./decode.jpg', arg);
  
  var _formData = {
    image:'image',
    image: fs.createReadStream('./decode.jpg') // FILE 이름
  };
  try {
   await request.post({url:N_API_URL+'face', formData:_formData, 
      headers: {
        'X-NCP-APIGW-API-KEY-ID':'uopedbkyc9'
        , 'X-NCP-APIGW-API-KEY': 'BKj03Yjp4Yie3MWr5QXaCZ1fICMkJopaMICHIq4J'
        , 'Content-Type' : 'multipart/form-data'
      }
    }, function(err,httpResponse,body){
      console.log(httpResponse.statusCode);
      console.log(body);
      event.reply('asynchronous-face', body);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await request.post({url:N_API_URL+'celebrity', formData:_formData, 
      headers: {
        'X-NCP-APIGW-API-KEY-ID':'uopedbkyc9'
        , 'X-NCP-APIGW-API-KEY': 'BKj03Yjp4Yie3MWr5QXaCZ1fICMkJopaMICHIq4J'
        , 'Content-Type' : 'multipart/form-data'
      }
    }, function(err,httpResponse,body){
      console.log(httpResponse.statusCode);
      console.log(body);
      event.sender.send('asynchronous-celeb', body);
    });
  } catch (error) {
    console.log(error);
  }
})
// 인터뷰 질문별 파일 저장시 호출 
ipcMain.on('asynchronous-video', async (event, filePath,  fileName, arg) => {
  console.log('video', fileName);
  console.log(filePath);
  //console.log(arg)
  try {
    !fs.existsSync(`./${filePath}`) && fs.mkdirSync(`./${filePath}`);
    
    await fs.writeFile(`./${filePath}/${fileName}`, arg, {}, (err, res) => {
      if(err){
          console.error(err)
          return
      }  
      console.log('video saved')
    });
  } catch (error) {
    console.log(error)
  }
})
// 인터뷰 파일 업로드 api
async function upload (adminID, userID, interviewID, interviewDutyID, detailIDList, filePath) {
  try {
    if(fs.existsSync(`./${filePath}`)) {
      console.log("폴더가 있으면");
        fs.readdirSync(`./${filePath}`).forEach( async function(file, index){   
          console.log("file", file);
          console.log("index", index);
          var curPath = `./${filePath}/${file}`;
          const interview = fs.createReadStream(curPath);

          var _formData = {
            group_id: adminID,
            admin_id: adminID,
            user_id: userID,
            interview_id: interviewID,
            interivew_duty_id: interviewDutyID,
            interview_detail_id: detailIDList[index],
            key:filePath,
            interview: interview // FILE 이름
          };
        
          await request.post({url:UPLOAD_URL, formData:_formData, 
            headers: {
              'Content-Type' : 'multipart/form-data'
            }
            }, function(err,httpResponse,body){
              console.log(httpResponse);
              console.log(body);
          });       
        })
      }
  } catch (error) {
    console.log(error)
  }
}
// 인터뷰 완료시 호출
ipcMain.on('asynchronous-videoComplate', (event, interviewID, interviewDutyID, detailIDList, userID, adminID, filePath, flag) => {
  console.log(adminID);
  console.log(filePath);
    try {
    if (flag === "Y") { 
        console.log("Upload Y");
        upload(adminID, userID, interviewID, interviewDutyID, detailIDList, filePath);
    }else {
      console.log("Upload N");
      if(fs.existsSync(`./${filePath}`)) {
        fs.readdirSync(`./${filePath}`).forEach(function(file, index){   
          var curPath = `./${filePath}/${file}`;
          // if (fs.lstatSync(curPath).isDirectory()) { // lstatSync: stat값을 반환함, isDirectory(): 디렉토리인지 파악
          //   deleteFolderRecursive(curPath);          // 재귀(reCurse)
          // } else {                                              // delete file
            fs.unlinkSync(curPath);                     // unlinkSync: 파일 삭제
          //}
        });
        fs.rmdirSync(`./${filePath}`);         
      }
    }
  } catch (error) {
      console.log(error)
  }
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-message', config);
})

if (require("electron-squirrel-startup")) {
  app.quit();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
