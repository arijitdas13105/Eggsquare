import React from 'react'
import './Benifits.css'
const BenifitsSection = () => {
  return (
    <div className="product-benefit-nutrition">
    <div className="product-benefits">
      <h2>Benefits</h2>
      <ul>
        <li>High bio-available protein</li>
        <li>Enriched with Lutein (Memory Booster and Vision Improvement)</li>
        <li>Improves HDL levels (Good Cholesterol)</li>
        <li>UV Sanitized</li>
        <li>Antibiotics residue-free</li>
        <li>Free from Growth promoter hormones and steroids</li>
      </ul>
    </div>
    <div className="product-nutrition">
      <h2>Nutritional Information</h2>
      <div className="nutrition-item">
        <span>Calories (Kcal)</span>
        <span>140</span>
      </div>
      <div className="nutrition-item">
        <span>Total Fat (g)</span>
        <span>9</span>
      </div>
      <div className="nutrition-item">
        <span>Protein (g)</span>
        <span>13.5</span>
      </div>
      <div className="nutrition-item">
        <span>Carbohydrate (g)</span>
        <span>0.57</span>
      </div>
      <div className="nutrition-item">
        <span>Phosphorous (mg)</span>
        <span>180</span>
      </div>
      <div className="nutrition-item">
        <span>Calcium (mg)</span>
        <span>50</span>
      </div>
      <div className="nutrition-item">
        <span>Iron (mg)</span>
        <span>1</span>
      </div>
    </div>
  </div>
  )
}

export default BenifitsSection