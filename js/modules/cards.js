import {getResourse} from '../services/services';

function cards() {
    // Menu card

    class MenuCard {
        constructor(imgSrc, imgTitle, cardTitle, descr, price, parentSelector, ...classes) {
            this.imgSrc = imgSrc;
            this.imgTitle = imgTitle;
            this.cardTitle = cardTitle;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.classList = classes;
        }

        changeCurrency() {
            this.price = +this.price * this.transfer;
            return this.price;
        }

        render() {
            const menuItem = document.createElement('div');

            if (this.classList.length === 0) {
                menuItem.classList.add('menu__item');
            } else {
                this.classList.forEach(className => menuItem.classList.add(className));
            }

            menuItem.innerHTML = `
                <img src="${this.imgSrc}" alt="${this.imgTitle}">
                <h3 class="menu__item-subtitle">${this.cardTitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.changeCurrency()}</span> грн/день</div>
                </div>  
            `;
            this.parent.append(menuItem);

        }
    }

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;