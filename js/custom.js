document.addEventListener('DOMContentLoaded', () => {

	if (document.querySelectorAll('.go-top').length) {
		const goTop = document.querySelector('.go-top')

		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 300) {
				goTop.classList.add('go-top_active')
			} else {
				goTop.classList.remove('go-top_active')
			}
		})

		goTop.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			})
		})
	}


	const scrollItems = document.querySelectorAll('.scroll-item');

	window.addEventListener('scroll', checkItems);
	checkItems();
	function checkItems() {
		const triggetBottom = window.innerHeight / 5 * 4;
		scrollItems.forEach((item) => {
			const itemTop = item.getBoundingClientRect().top;

			if (itemTop < triggetBottom) {
				item.classList.add('animation-class');
			} else {
				item.classList.remove('animation-class');
			}
		})
	}


	const cards = document.querySelectorAll('.offer__card')
	const headerCart = document.querySelector('.header__cart');
	const cart = document.querySelector('.cart')
	const closeBtn = document.querySelector('.cart__btn-close')
	const cardBtns = document.querySelectorAll('.card__btn')

	cards.forEach((el) => {
		el.addEventListener('click', (e) => {
			if (e.target.classList.contains('card__add')) {
				let quantity = e.currentTarget.querySelector('.card__quantity').textContent
				let newValue = ++quantity

				if (newValue === 21) {
					return false
				} else {
					e.currentTarget.querySelector('.card__quantity').textContent = `${newValue}`
					e.currentTarget.querySelector('.card__btn').classList.remove('card__btn_disabled')
				}
			}
			if (e.target.classList.contains('card__remove')) {
				let quantity = e.currentTarget.querySelector('.card__quantity').textContent
				let newValue = --quantity

				if (newValue <= 0) {
					e.currentTarget.querySelector('.card__btn').classList.add('card__btn_disabled')
					e.currentTarget.querySelector('.card__quantity').textContent = `0`
					return false
				} else {
					e.currentTarget.querySelector('.card__quantity').textContent = `${newValue}`
				}
			}
		})
	})


	const generateCartProduct = (img, price, title, quantity, id) => {
		return `
		<div class="cart__item" id="${id}">
			
			<img class="cart__img" src="${img}" alt="" />
			<div class="cart__box">
				<div class="cart__price">$ ${price}</div>
				<div class="cart__title">${title}</div>
			</div>	
			<div class="cart__box">
				<button class="cart__btn-delete btn_reset"></button>
				<div class="cart__controls">
					<div class="cart__quantity">${quantity}</div>
					<div class="cart__buttons">
						<button class="cart__add btn_reset">+</button>
						<button class="cart__remove btn_reset">-</button>
					</div>
				</div>					
			</div>
  		</div>
		`
	}


	cardBtns.forEach((el) => {
		el.addEventListener('click', (e) => {
			let self = e.currentTarget;
			let parent = self.closest('.card')
			let id = parent.id
			let img = parent.querySelector('.card__img').getAttribute('src');
			let title = parent.querySelector('.card__title').textContent;
			let price = parent.querySelector('.card__price-value').textContent;
			let quantity = parseInt(parent.querySelector('.card__quantity').textContent);


			self.classList.add('card__btn_disable')
			if (quantity <= 0) {
				document.querySelector('.header__cart').classList.remove('header__cart_active')
			} else {
				document.querySelector('.header__cart').classList.add('header__cart_active')
			}

			let oldValue = parseInt(document.querySelector('.header__cart-quantity').textContent)
			document.querySelector('.header__cart-quantity').textContent = `${oldValue += quantity}`

			document.querySelector('.cart__list').insertAdjacentHTML('afterbegin', generateCartProduct(img, price, title, quantity, id))

			document.querySelector('.cart__item').addEventListener('click', (e) => {
				if (e.target.classList.contains('cart__add')) {
					let quantity = parseInt(e.currentTarget.querySelector('.cart__quantity').textContent)
					let newQuantity = quantity + 1
					if (newQuantity === 20) {
						return false
					} else {
						e.currentTarget.querySelector('.cart__quantity').textContent = `${newQuantity}`
					}
				}
				if (e.target.classList.contains('cart__remove')) {
					let quantity = parseInt(e.currentTarget.querySelector('.cart__quantity').textContent)
					let newQuantity = quantity - 1
					if (newQuantity === 0) {
						return false
					} else {
						e.currentTarget.querySelector('.cart__quantity').textContent = `${newQuantity}`
					}
				}
				let id = e.currentTarget.id
				if (e.target.classList.contains('cart__btn-delete')) {
					e.currentTarget.remove()
					document.querySelector(`.card[id="${id}"]`).querySelector('.card__btn').classList.remove('card__btn_disable')
					if (document.querySelectorAll('.cart__item').length <= 0) {
						document.querySelector('.header__cart-quantity').textContent = `0`
						headerCart.classList.remove('header__cart_active')
						cart.classList.remove('cart_active')
						if (document.querySelector('.header__nav').classList.contains('header__nav_visible')) {
							return
						} else {
							document.querySelector('body').classList.remove('stop-scroll')
						}
					}
				}
			})
		})
	})

	closeBtn.addEventListener('click', () => {
		cart.classList.remove('cart_active')
		let sum = 0;

		document.querySelectorAll('.cart__list .cart__quantity').forEach(el => {
			sum += parseInt(el.textContent)
		})
		document.querySelector('.header__cart-quantity').textContent = `${sum}`
		if (document.querySelectorAll('.cart__list .cart__item').length <= 0) {
			document.querySelector('.header__cart').classList.remove('header__cart_active')
		}
		if (document.querySelector('.header__nav').classList.contains('header__nav_visible')) {
			return
		} else {
			document.querySelector('body').classList.remove('stop-scroll')
		}
	})

	headerCart.addEventListener('click', () => {
		if (headerCart.classList.contains('header__cart_active')) {
			document.querySelector('.cart').classList.add('cart_active')
			document.querySelector('body').classList.add('stop-scroll')
		}
	})

	

	

	

	

	

	

	
	const loadMoreBtn = document.querySelector('#load-more')

	let currentItem = 6;

	

	loadMoreBtn.onclick = () => {

	   let items = [...document.querySelectorAll('.gallery__items .gallery__item')]

	   for (var i = currentItem; i < currentItem + 6; i++) {

	      items[i].classList.add('gallery__item_visible')

	   }

	   currentItem += 6;

	

	   if (currentItem >= items.length) {

	      loadMoreBtn.style.display = 'none';

	   }

	}

	
	

	const burger = document?.querySelector('[data-burger]');

	const nav = document?.querySelector('.nav');

	const navLinks = nav?.querySelectorAll('.header__nav-link');

	const body = document.body;

	

	burger?.addEventListener('click', () => {

	   body.classList.toggle('stop-scroll');

	   burger?.classList.toggle('burger_active');

	   nav?.classList.toggle('header__nav_visible');

	});

	

	navLinks.forEach(el => {

	   el.addEventListener('click', () => {

	      body.classList.remove('stop-scroll');

	      burger?.classList.remove('burger_active');

	      nav?.classList.remove('header__nav_visible');

	   });

	});

	
	

	const closeModal = document.querySelector('.modal__btn-close')

	const modal = document.querySelector('.modal')

	const btns = document.querySelectorAll('.btn')

	

	closeModal.addEventListener('click', () => {

	   modal.classList.remove('modal_visible')

	   body.classList.remove('stop-scroll')

	})

	

	btns.forEach((el) => {

	   el.addEventListener('click', () => {

	      modal.classList.add('modal_visible')

	      body.classList.add('stop-scroll')

	   })

	})

	

	// inputmask

	

	const telSelector = document.querySelector('.modal__input-tel')

	const inputMask = new Inputmask('+8 (801) 999-999-999');

	inputMask.mask(telSelector);

	

	

	const validation = new JustValidate('.modal__form');

	

	validation

	   .addField('.modal__input-name', [

	      {

	         rule: 'minLength',

	         value: 3,

	         errorMessage: 'Name must contain minimum 3 symbols'

	      },

	      {

	         rule: 'maxLength',

	         value: 30,

	      },

	      {

	         rule: 'required',

	         value: true,

	         errorMessage: 'Enter your name!'

	      }

	   ])

	   .addField('.modal__input-email', [

	      {

	         rule: 'required',

	         value: true,

	         errorMessage: 'Email is required',

	      },

	      {

	         rule: 'email',

	         value: true,

	         errorMessage: 'Entre correct Email',

	      },

	   ])

	   .addField('.modal__input-tel', [

	      {

	         rule: 'required',

	         value: true,

	         errorMessage: 'Telephone is required',

	      },

	      {

	         rule: 'function',

	         validator: function () {

	            const phone = telSelector.inputmask.unmaskedvalue();

	            return phone.length === 10;

	         },

	         errorMessage: 'Enter correct telephone number',

	      },

	   ]).onSuccess((event) => {

	      console.log('Validation passes and form submitted', event);

	

	      let formData = new FormData(event.target);

	

	      console.log(...formData);

	

	      let xhr = new XMLHttpRequest();

	

	      xhr.onreadystatechange = function () {

	         if (xhr.readyState === 4) {

	            if (xhr.status === 200) {

	               console.log('Отправлено');

	            }

	         }

	      }

	

	      xhr.open('POST', 'mail.php', true);

	      xhr.send(formData);

	

	      event.target.reset();

	   });

	
	const offerSwiper = new Swiper('.offer__swiper', {

	  speed: 500,

	  autoplay: {

	    delay: 2000,

	  },

	  watchSlidesProgress: true,

	  navigation: {

	    nextEl: '.offer__swiper-button-prev',

	    prevEl: '.offer__swiper-button-next',

	  },

	  breakpoints: {

	    320: {

	      slidesPerView: 1,

	      centeredSlides: true,

	      spaceBetween: 0,

	    },

	    700: {

	      slidesPerView: 2,

	      spaceBetween: 100,

	      centeredSlides: false,

	    },

	    1024: {

	      slidesPerView: 3,

	      spaceBetween: 60

	    }

	  }

	});
});
