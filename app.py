# app.py
from flask import Flask, render_template, request, jsonify, send_from_directory
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import yfinance as yf
import os

app = Flask(__name__, static_url_path='')

# Ensure the static folder exists
os.makedirs('static', exist_ok=True)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

class InvestmentCalculator:
    def __init__(self):
        self.risk_free_rate = 0.05

    def calculate_sip(self, monthly_investment, years, expected_return, investment_type="monthly"):
        if investment_type == "lumpsum":
            future_value = monthly_investment * (1 + expected_return/100) ** years
            return round(future_value, 2)
        
        months = years * 12
        monthly_rate = (expected_return/100)/12
        future_value = monthly_investment * ((1 + monthly_rate) ** months - 1) / monthly_rate * (1 + monthly_rate)
        return round(future_value, 2)

    def calculate_swp(self, initial_investment, monthly_withdrawal, years, expected_return):
        months = years * 12
        monthly_rate = (expected_return/100)/12
        future_value = initial_investment * (1 + monthly_rate) ** months - \
                      monthly_withdrawal * ((1 + monthly_rate) ** months - 1) / monthly_rate
        return round(future_value, 2)

    def calculate_stp(self, initial_investment, monthly_transfer, years, source_return, target_return):
        months = years * 12
        source_monthly_rate = (source_return/100)/12
        target_monthly_rate = (target_return/100)/12
        
        source_final = initial_investment * (1 + source_monthly_rate) ** months - \
                      monthly_transfer * ((1 + source_monthly_rate) ** months - 1) / source_monthly_rate
        
        target_final = monthly_transfer * ((1 + target_monthly_rate) ** months - 1) / target_monthly_rate * \
                      (1 + target_monthly_rate)
        
        return round(source_final, 2), round(target_final, 2)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        calculator = InvestmentCalculator()
        
        result = {
            'success': True,
            'future_value': 0,
            'recommendation': '',
            'sharpe_ratio': None
        }
        
        investment_type = data.get('investmentType', 'sip')
        amount = float(data.get('amount', 0))
        years = float(data.get('years', 1))
        expected_return = float(data.get('expectedReturn', 10))
        
        if investment_type == 'sip':
            result['future_value'] = calculator.calculate_sip(
                amount, years, expected_return, data.get('sipType', 'monthly'))
        elif investment_type == 'swp':
            result['future_value'] = calculator.calculate_swp(
                amount, float(data.get('monthlyWithdrawal', 0)), years, expected_return)
        elif investment_type == 'stp':
            source_final, target_final = calculator.calculate_stp(
                amount, float(data.get('monthlyTransfer', 0)), years,
                float(data.get('sourceReturn', 0)), float(data.get('targetReturn', 0)))
            result['source_final'] = source_final
            result['target_final'] = target_final
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=8080, debug=True)
