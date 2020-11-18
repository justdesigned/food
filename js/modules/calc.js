function calc() {
    //Calculator

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '- - - -';
        } else {
            if (sex === "female") {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    }

    initLocalStorageData('#gender', 'calculating__choose-item_active');
    initLocalStorageData('.calculating__choose_big', 'calculating__choose-item_active');

    function getStaticInformation(parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);

        elements.forEach(e => {
            e.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(e => {
                    e.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();

                console.log(sex, height, weight, age, ratio);
            });
        });
    }

    function getDynamicInformation(parent) {
        const input = document.querySelector(parent);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "solid 1px red";
            } else {
                input.style.border = "";
            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        });


    }

    function initLocalStorageData(parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);

        elements.forEach(e => {
            e.classList.remove(activeClass);
            if (e.getAttribute('id') === localStorage.getItem('sex')) {
                e.classList.add(activeClass);
            }
            if (e.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                e.classList.add(activeClass);
            }
        });

        // if (localStorage.getItem('ratio')) {
        //     ratio = localStorage.getItem('ratio');
        // } else {
        //     ratio = 1.375;
        // }

        // if (localStorage.getItem('sex')) {
        //     sex = localStorage.getItem('sex');
        // } else {
        //     sex = 'female';
        // }
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

    calcTotal();
}

export default calc;