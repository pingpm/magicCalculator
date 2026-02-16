class MagicCalculator {
    constructor() {
        this.display = document.getElementById('display');
        this.secretArea = document.getElementById('secretArea');
        
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        
        // 魔术模式
        this.magicMode = false;
        this.targetNumber = null;
        this.magicDifference = null;
        
        this.init();
    }
    
    init() {
        // 数字按钮
        document.querySelectorAll('.btn.number').forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.dataset.value;
                this.inputNumber(value);
            });
        });
        
        // 操作按钮
        document.querySelectorAll('.btn.operator').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleOperator(action);
            });
        });
        
        // 功能按钮
        document.querySelectorAll('.btn.function').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleFunction(action);
            });
        });
        
        // 秘密区域 - 长按设置目标数字，快速点击计算差值
        let longPressTimer;
        let isLongPress = false;
        
        const startPress = (e) => {
            e.preventDefault();
            isLongPress = false;
            longPressTimer = setTimeout(() => {
                isLongPress = true;
                this.setTargetNumber();
            }, 1000);
        };
        
        const endPress = (e) => {
            e.preventDefault();
            clearTimeout(longPressTimer);
            
            // 如果不是长按，则是快速点击，计算差值
            if (!isLongPress) {
                this.calculateDifference();
            }
        };
        
        // 支持触摸和鼠标
        this.secretArea.addEventListener('touchstart', startPress);
        this.secretArea.addEventListener('touchend', endPress);
        this.secretArea.addEventListener('mousedown', startPress);
        this.secretArea.addEventListener('mouseup', endPress);
    }
    
    inputNumber(num) {
        if (this.magicMode) return; // 魔术模式下锁定数字输入
        
        if (this.shouldResetDisplay) {
            this.currentValue = num === '.' ? '0.' : num;
            this.shouldResetDisplay = false;
        } else {
            if (num === '.' && this.currentValue.includes('.')) return;
            this.currentValue = this.currentValue === '0' && num !== '.' 
                ? num 
                : this.currentValue + num;
        }
        this.updateDisplay();
    }
    
    handleOperator(action) {
        const current = parseFloat(this.currentValue);
        
        if (action === 'equals') {
            if (this.magicMode && this.magicDifference !== null) {
                // 魔术模式：显示目标数字
                this.currentValue = this.targetNumber.toString();
                this.magicMode = false;
                this.magicDifference = null;
                this.operation = null;
                this.previousValue = null;
                console.log('魔术完成！显示目标数字:', this.targetNumber);
            } else if (this.operation && this.previousValue !== null) {
                this.currentValue = this.calculate(this.previousValue, current, this.operation).toString();
                this.operation = null;
                this.previousValue = null;
            }
            this.shouldResetDisplay = true;
        } else {
            if (this.magicMode) return; // 魔术模式下锁定其他操作符
            
            if (this.operation && this.previousValue !== null && !this.shouldResetDisplay) {
                this.currentValue = this.calculate(this.previousValue, current, this.operation).toString();
            }
            
            this.previousValue = parseFloat(this.currentValue);
            this.operation = action;
            this.shouldResetDisplay = true;
        }
        
        this.updateDisplay();
        this.updateOperatorButtons(action);
    }
    
    handleFunction(action) {
        if (this.magicMode) return; // 魔术模式下锁定功能按钮
        
        switch(action) {
            case 'clear':
                this.currentValue = '0';
                this.previousValue = null;
                this.operation = null;
                this.magicMode = false;
                this.magicDifference = null;
                break;
            case 'toggle-sign':
                this.currentValue = (parseFloat(this.currentValue) * -1).toString();
                break;
            case 'percent':
                this.currentValue = (parseFloat(this.currentValue) / 100).toString();
                break;
        }
        this.updateDisplay();
        this.updateOperatorButtons();
    }
    
    calculate(a, b, operation) {
        switch(operation) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide': return b !== 0 ? a / b : 0;
            default: return b;
        }
    }
    
    setTargetNumber() {
        this.targetNumber = parseFloat(this.currentValue);
        this.vibrate();
        // 短暂闪烁提示
        this.display.style.opacity = '0.3';
        setTimeout(() => {
            this.display.style.opacity = '1';
        }, 100);
        
        console.log('目标数字已设置:', this.targetNumber);
    }
    
    calculateDifference() {
        if (this.targetNumber === null) {
            console.log('请先长按设置目标数字');
            return;
        }
        
        const current = parseFloat(this.currentValue);
        this.magicDifference = this.targetNumber - current;
        this.currentValue = this.magicDifference.toString();
        this.magicMode = true;
        this.updateDisplay();
        this.vibrate();
        
        console.log('当前值:', current);
        console.log('目标值:', this.targetNumber);
        console.log('差值:', this.magicDifference);
        console.log('键盘已锁定，只有等号可以按');
    }
    
    updateDisplay() {
        let displayValue = this.currentValue;
        
        // 处理数字格式化
        if (!isNaN(displayValue) && displayValue !== '') {
            const num = parseFloat(displayValue);
            
            // 处理小数
            if (displayValue.includes('.')) {
                const parts = displayValue.split('.');
                const integerPart = parts[0];
                const decimalPart = parts[1] || '';
                
                // 整数部分添加千位分隔符
                const formattedInteger = this.formatWithCommas(integerPart);
                displayValue = decimalPart ? `${formattedInteger}.${decimalPart}` : `${formattedInteger}.`;
            } else {
                // 整数添加千位分隔符
                displayValue = this.formatWithCommas(displayValue);
            }
        }
        
        // 动态调整字体大小
        const length = displayValue.length;
        let fontSize;
        
        if (length <= 6) {
            fontSize = 96;
        } else if (length <= 8) {
            fontSize = 80;
        } else if (length <= 10) {
            fontSize = 64;
        } else if (length <= 12) {
            fontSize = 56;
        } else {
            fontSize = 48;
        }
        
        this.display.style.fontSize = fontSize + 'px';
        this.display.textContent = displayValue;
    }
    
    formatWithCommas(value) {
        // 处理负号
        const isNegative = value.startsWith('-');
        const absValue = isNegative ? value.substring(1) : value;
        
        // 添加千位分隔符
        const formatted = absValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        return isNegative ? '-' + formatted : formatted;
    }
    
    updateOperatorButtons(activeOp = null) {
        document.querySelectorAll('.btn.operator').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.action === activeOp && activeOp !== 'equals') {
                btn.classList.add('active');
            }
        });
    }
    
    vibrate() {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }
}

// 初始化计算器
const calculator = new MagicCalculator();

// 注册 Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
