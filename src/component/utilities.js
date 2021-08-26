
export const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();

    return year + month + day + hour + minute + seconds;
}
export const TRIANGULATION = [
    
]
export const drawMesh = (predictions, ctx) => {
    if(predictions.length > 0) {
        predictions.forEach(prediction => {
            // model: face mash
            // const keypoints = prediction.scaledMesh;
            // //console.log("keypoint", keypoints);
            // const box = prediction.boundingBox;
            // // for (let i =0; i<keypoints.length; i++) {
            // //     const x = keypoints[i][0]
            // //     const y = keypoints[i][1];

            // //     ctx.beginPath();
            // //     ctx.arc(x, y, 1, 0, 3 * Math.PI);
            // //     ctx.fillStyle = "pink";
            // //     ctx.fill();
            // //     console.log("ctxstyle", ctx);
            // // }  눈코입얼굴모양 랜드마크 잡는부분 
            // ctx.beginPath();
            // ctx.strokeStyle = "blue";
            // ctx.strokeRect(prediction.topLeft[0], prediction.topLeft[1] +30, 240, 240);
            const start = prediction.topLeft;
            const end = prediction.bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];
            
             ctx.beginPath();
             ctx.strokeStyle = "blue";
             ctx.strokeRect(start[0], start[1], size[0], size[1]);
             return size;
        });
    }else {
        // console.log("거짓");
    }

}