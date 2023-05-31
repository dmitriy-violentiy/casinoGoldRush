import React, { useState } from "react"
import classes from '../App.module.css';
import starIcon from '../img/star.png'
import balanceIcon from '../img/balance.png'
import backIcon from '../img/back.png'
import './wheel.css'
import { CSSTransition } from 'react-transition-group'
import slot1 from '../img/slot1.png'
import slot2 from '../img/slot2.png'
import slot3 from '../img/slot3.png'


const MainComp = () => {

   const [countBid, setCountBid] = useState(100000)
   let bidAdd = () => {
      setCountBid(countBid + 500)
   }
   let bidDel = () => {
      setCountBid(countBid - 500)
   }
   const [stars, setStars] = useState(0)
   const [win, setWin] = useState(0)
   const [balance, setBalance] = useState(1000000)

   let spin = () => {
      setBalance(balance - countBid + win)
      setStars(stars + 100)

      if(gameState.length === 3) {
         if (gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
            setWin(countBid*5)
         } else {
            setWin(0)
         }
      }

      let newGameState = gambData.map((el) => {
         const bandLength = el.value.length
         const randomIdx = Math.floor(Math.random() * bandLength)
         return el.value[randomIdx]
      })
      setPlayAnimation(true)
      setGameState(gameState.map(el => ''))
      setTimeout(() => {
         setGameState(newGameState)
         setPlayAnimation(false)
      }, duration.value);

   }

   const btnActive = {
      cursor: 'pointer'
   }
   const btnDisable = {
      opacity: 0.6,
      pointerEvents: 'none'
   }

   const slotImg1 = <img className="animationImg" key={1} src={slot1} alt="slot1" />
   const slotImg2 = <img className="animationImg" key={2} src={slot2} alt="slot2" />
   const slotImg3 = <img className="animationImg" key={3} src={slot3} alt="slot3" />
   const gambData = [
      {
         id: 1,
         value: [slotImg1,slotImg2,slotImg3]
      },
      {
         id: 3,
         value: [slotImg2,slotImg1,slotImg3]
      },
      {
         id: 2,
         value: [slotImg3,slotImg2,slotImg1]
      },
   ]
   const [gameState, setGameState] = useState(() => {
      const defaultGameState = gambData.map(el => el.value[0])
      
      return defaultGameState
   })

   const [playAnimation, setPlayAnimation] = useState(false)
   const duration = {
      value: 600
   }

   return(
      <div className={classes.container}>
         
         <header className={classes.header}>
               <div className={classes.headerWrap}>
                  <span className={classes.roundBtnWrap + ' ' + classes.back}><input className={classes.roundBtn} type="button" /><img className={classes.backIcon} src={backIcon}></img></span>
                  <div className={classes.starsWrap}><span className={classes.stars}><img className={classes.starIcon} src={starIcon}></img>{stars}</span></div>
                  <div className={classes.balanceWrap}><span className={classes.balance}><img className={classes.balanceIcon} src={balanceIcon}></img>{balance}</span></div>
               </div>
         </header>


         <div className="gamblingWrap">
         <div className="gamblingCont">
         <div className='gambling'>
            <div className='gamblingWindowsFake'>
                  {gameState.map((el, idx) => (
                     <div className='gamblingWindowsItem'>
                        <CSSTransition in={playAnimation} timeout={duration.value} classNames='animationItem'>
                           <div className='gamblingWindowsItemList'>
                              {gambData[idx].value.map((itemList, idx)=>(
                                 <div className='gamblingWindowsItemListItem' key={`itemList${idx}`}>{itemList}</div>
                              ))}
                           </div>
                        </CSSTransition>
                        <div key={`game${idx}`}>{el}</div>
                     </div>
                  ))}
            </div>
         </div>


         <div className='gambling'>
            <div className='gamblingWindows'>
                  {gameState.map((el, idx) => (
                     <div className='gamblingWindowsItem'>
                        <CSSTransition in={playAnimation} timeout={duration.value} classNames='animationItem'>
                           <div className='gamblingWindowsItemList'>
                              {gambData[idx].value.map((itemList, idx)=>(
                                 <div className='gamblingWindowsItemListItem' key={`itemList${idx}`}>{itemList}</div>
                              ))}
                           </div>
                        </CSSTransition>
                        <div key={`game${idx}`}>{el}</div>
                     </div>
                  ))}
            </div>
         </div>

         <div className='gambling'>
            <div className='gamblingWindowsFake'>
                  {gameState.map((el, idx) => (
                     <div className='gamblingWindowsItem'>
                        <CSSTransition in={playAnimation} timeout={duration.value} classNames='animationItem'>
                           <div className='gamblingWindowsItemList'>
                              {gambData[idx].value.map((itemList, idx)=>(
                                 <div className='gamblingWindowsItemListItem' key={`itemList${idx}`}>{itemList}</div>
                              ))}
                           </div>
                        </CSSTransition>
                        <div key={`game${idx}`}>{el}</div>
                     </div>
                  ))}
            </div>
         </div>
         </div>   
      </div>


      <footer className={classes.footer}>
         <div className={classes.bidContainer}>
            <div><input className={classes.roundBtn} type="button" onClick={bidDel} value='-' /></div>
            <div className={classes.bidNumContainer}><span className={classes.countBid}>{countBid}</span></div>
            <div><input className={classes.roundBtn} type="button" onClick={bidAdd} value='+' /></div>
         </div>
         <div className={classes.winContainer}>
            <span className={classes.win}>win</span><span className={classes.winNum}>{win}</span>
         </div>
         <div>
            <input className={classes.spin} style={balance>=countBid?btnActive:btnDisable} type="button" value='SPIN' onClick={spin} />
            </div>
      </footer>
      
   </div>
      
   )
}

export default MainComp