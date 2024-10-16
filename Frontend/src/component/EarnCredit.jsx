import React from "react";

const EarnCredit = () => {
  return (
    <div>
      <h1 className=" fs-3">Earn Credits</h1>
      <p className=" fs-6 mb-3">
        When the invitee recharges for the first time, You will receive 50%
        Spear Credit as a reward.
      </p>
      <div className=" p-2 border-1 bg-white round-3 d-flex  justify-content-between">
        <div>
          <h1 className=" fs-4">0.0 Spear Credit</h1>
          <p className=" fs-6">Referral Amount</p>
        </div>
        <div className=" align-self-center">
          <button className=" btn btn-medium btn-success">
            Copy referral link
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarnCredit;
