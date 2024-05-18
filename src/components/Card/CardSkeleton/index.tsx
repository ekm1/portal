import React from "react";

export const CardSkeleton = () => (
  <div data-testid="skeleton" className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2"/>
      </div>
      <div className="card-title">Loading...</div>
      <div className="card-description">
        <div className="skeleton h-4 w-full mb-2"/>
        <div className="skeleton h-4 w-3/4"/>
      </div>
    </div>
  </div>
);
