window.addEventListener('load', function () {

    $('.cselect').styler();

    let calc = new Calc();

});

class Calc {
    constructor() {

        this.form = document.querySelector("#calc");

        this.fields = {
            square: document.querySelector("#square"),
            testControl: document.querySelector("#testControl"),
            testMagnetic: document.querySelector("#testMagnetic"),
            testRadiation: document.querySelector("#testRadiation"),
            thermal: document.querySelector("#thermal"),
            thermalReport: document.querySelector("#thermalReport"),
            conclusion: document.querySelector("#conclusion"),
            inspection: document.querySelector("#inspection"),
            total:document.querySelector("#total"),
        }

        this.sums = {};

        this.variables = {
            square: 60,
            autocad: {
                no: 0,
                simple: 30,
                yes: 60
            },
            testControl: 60,
            testMagnetic: 10,
            testRadiation: 10,
            thermal: {
                0: 1000,
                1: 1500,
                2: 2000,
                3: 2500,
                4: 3000,
                5: 3500,
                6: 4000,
            },
            thermalReport: 1500,
            conclusion: {
                whitebox: 1500,
                finish: 2000
            },
            inspection: 80,
            nds: 1
        }

        this.#init();
        this.calcSums();
    }

    #init() {
        this.form.addEventListener("submit", function (e) {
            e.preventDefault();
        });

        $('.cselect').on('change', this.calcSums);

        $('input[name="nds"]').on("change",  (e)=>{
            if (e.target.value == "yes" && e.target.checked){
                this.variables.nds = 1.2;
            } else {
                this.variables.nds = 1;
            }

            $('input[name="nds"]').not($(e.target)).prop('checked',false);
        });

        this.form.addEventListener("change", this.calcSums);
    }

    calcSums = () => {
        this.sums.square = Number(this.fields.square.value) * this.variables.square;

        this.sums.autocad = this.fields.square.value * Number(this.variables.autocad[this.form.elements["autocad"].value]);

        this.sums.testControl = Number(this.fields.square.value) * Number((this.fields.testControl.checked) ? this.variables.testControl : 0);
        this.sums.testMagnetic = Number(this.fields.square.value) * Number((this.fields.testMagnetic.checked) ? this.variables.testMagnetic : 0);
        this.sums.testRadiation = Number(this.fields.square.value) * Number((this.fields.testRadiation.checked) ? this.variables.testRadiation : 0);

        this.sums.thermal = Number((this.fields.thermal.checked) ? this.variables.thermal[document.querySelector("#rooms").value] : 0);
        this.sums.thermalReport = Number((this.fields.thermalReport.checked) ? this.variables.thermalReport : 0);
        this.sums.conclusion = Number((this.fields.conclusion.checked) ? this.variables.conclusion[document.querySelector("#trim").value] : 0);
        this.sums.inspection = Number((this.fields.inspection.checked) ? this.variables.inspection * Number(this.fields.square.value) - this.sums.square : 0);


        // console.log(`Площадь: ${this.sums.square}`);
        // console.log(`AutoCad: ${this.sums.autocad}`);
        // console.log(`Контрольный замер площади: ${this.sums.testControl}`);
        // console.log(`Замер электромагнитного фона: ${this.sums.testMagnetic}`);
        // console.log(`Замер радиационного фона: ${this.sums.testRadiation}`);
        // console.log(`Тепловизионное обследование: ${this.sums.thermal}`);
        // console.log(`Нужен ли отчёт по тепловизионному обследованию?: ${this.sums.thermalReport}`);
        // console.log(`Нужно ли вам Заключение специалиста с фото и нормативами?: ${this.sums.conclusion}`);
        // console.log(`Приёмка после ремонта: ${this.sums.inspection}`);
        // console.log(this.sums);

        //Сумма всех полей
        let arr = Object.keys(this.sums).map((key) => this.sums[key]);
        let sums = arr.reduce((sum, num) => {
            return sum + num;
        }, 0);
        // console.log(arr);

        //Умножаем на НДС
        let total = sums*this.variables.nds;

        // console.log(total);

        // Выводим итого
        this.fields.total.innerHTML = total;

    }

}