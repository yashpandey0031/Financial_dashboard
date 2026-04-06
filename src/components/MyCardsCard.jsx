import React from "react";

const MyCardsCard = () => {
  return (
    <div className="card">
      <h4 className="card-title">My Cards</h4>
      <div className="cards-container">
        <div className="credit-card dark">
          <div className="card-chip">
            <div></div>
            <div></div>
          </div>
          <p className="card-name">John Doe</p>
          <div className="card-number">•••• •••• •••• 8292</div>
          <div className="card-footer">
            <span>02/28</span>
            <span>029</span>
          </div>
        </div>
        <div className="credit-card orange">
          <div className="card-chip">
            <div></div>
            <div></div>
          </div>
          <p className="card-name">Business</p>
          <div className="card-number">•••• •••• •••• 4288</div>
          <div className="card-footer">
            <span>12/25</span>
            <span>029</span>
          </div>
        </div>
        <div className="credit-card dark">
          <div className="card-chip">
            <div></div>
            <div></div>
          </div>
          <p className="card-name">Travel</p>
          <div className="card-number">•••• •••• •••• 7814</div>
          <div className="card-footer">
            <span>09/27</span>
            <span>413</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCardsCard;
