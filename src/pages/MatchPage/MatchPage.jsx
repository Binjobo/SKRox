import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";

const db = [
  {
    name: "Nadin",
    url: "https://i.pinimg.com/736x/68/e4/62/68e462373e6718d845afe5804cff43dc.jpg",
  },
  {
    name: "Melissa",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ggdWWRjvBLjE-me1Iu6p56FCjlJ0laaLw&usqp=CAU",
  },
  {
    name: "Fatiza",
    url: "https://i.pinimg.com/736x/53/86/47/5386474858cfbab81e66aa4b5bee7e85.jpg",
  },
  {
    name: "Mei Ling",
    url: "https://preview.redd.it/cute-chinese-girl-prompt-v0-unj4c2swcfeb1.png?width=640&crop=smart&auto=webp&s=83941ee466088c30abfc37c52ad09c5efc7bc153",
  },
  {
    name: "Natesh",
    url: "https://i.pinimg.com/736x/07/e6/fd/07e6fdbf251dfeaceafdaca93a09796e.jpg",
  },
];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Your Fellow Short Queens</h1>
      <div className="cardContainer">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          LIKE
        </button>
        <button
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          PASS
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Advanced;
