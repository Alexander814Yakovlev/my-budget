const app = Vue.createApp({
    data() {
        return {
            currency: '₽',
            operations: localStorage.getItem('myBudget') ? JSON.parse(localStorage.getItem('myBudget')) : []
        }
    },
    methods: {
        removeOperation(e) {
            let id = e.target.closest('li').id
            this.operations.pop(id)
            localStorage['myBudget'] = JSON.stringify(this.operations);
        },
        showAddIncome() {
            let overlay = document.querySelector('.overlay');
            let addIncomeWindow = document.querySelector('.income__operation');
            addIncomeWindow.hidden = false;
            overlay.hidden = false;
        },
        hideAll() {
            let overlay = document.querySelector('.overlay');
            let addIncomeWindow = document.querySelector('.income__operation');
            let addSpendingWindow = document.querySelector('.spending__operation');
            addIncomeWindow.hidden = true;
            addSpendingWindow.hidden = true;
            overlay.hidden = true;
        },
        addIncome() {
            let category = 'income';
            let date = document.querySelector("#income-date").value
            let amount = document.querySelector("#income-amount").value
            let title = document.querySelector("#income-text").value
            this.operations.push({
                'category': category,
                'date': date,
                'title': title,
                'amount': amount,
            })
            localStorage['myBudget'] = JSON.stringify(this.operations);
            this.hideAll();
            document.querySelector("#income-amount").value = '';
            document.querySelector("#income-text").value = '';
        },
        showAddSpending() {
            let overlay = document.querySelector('.overlay');
            let addSpendingWindow = document.querySelector('.spending__operation');
            addSpendingWindow.hidden = false;
            overlay.hidden = false;
        },
        addSpending() {
            let category = 'spending';
            let date = document.querySelector("#spending-date").value
            let amount = document.querySelector("#spending-amount").value
            let title = document.querySelector("#spending-text").value
            this.operations.push({
                'category': category,
                'date': date,
                'title': title,
                'amount': amount,
            })
            localStorage['myBudget'] = JSON.stringify(this.operations);
            this.hideAll()
            document.querySelector("#spending-amount").value = '';
            document.querySelector("#spending-text").value = '';
        },
    },
    computed: {
        totalIncome() {
            let income = 0;
            for (item of this.operations) {
                if (item.category == 'income') {
                    income += parseFloat(item.amount)
                }
            }
            return income;
        },
        totalSpending() {
            let spending = 0;
            for (item of this.operations) {
                if (item.category == 'spending') {
                    spending += parseFloat(item.amount)
                }
            }
            return spending;
        },
        totalBallance() {
            return this.totalIncome - this.totalSpending
        },
        today() {
            let date = new Date();
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, 0);
            let day = String(date.getDate()).padStart(2, 0);
            return `${year}-${month}-${day}`
        },
        exportCSV() {
            let csv = 'Категория,Дата,Описание,Сумма,\n'
            for (operation of this.operations) {
                let category = operation.category == 'income' ? 'Доход' : 'Расход';
                let row = `${category},${operation.date},${operation.title},${operation.amount},\n`
                csv += row
            }
            let blob = new Blob([csv], {type: 'text/csv'});
            let url = window.URL.createObjectURL(blob);
            return url
        },
    }
})

let vm = app.mount('.app')