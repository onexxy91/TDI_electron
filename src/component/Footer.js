import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GuideModal from './modal/GuideModal'
export default function Footer() {
    const [state, setState] = useState({
        selectedNews: undefined
    })
    const close = () => {
        setState({
            ...state,
            selectedNews: undefined
        })
    }
    const show = () => {
        setState({
            ...state,
            selectedNews: true
        })
    }
    return (
        <div className="footMenuContainer">
            <Link to="/centerintro" ><button>센터소개</button> </Link>
            <Link to="/menuAll" ><button>전체보기</button></Link>
            <Link to="/" ><button>Home</button></Link>
            <Link to="/test" ><button>스크랩</button></Link>
            <Link><button onClick={show}>이용안내</button></Link>
            {/* <GuideModal closeNews={close} selectedNews={state.selectedNews} /> */}
        </div>
    )
}