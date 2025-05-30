const correctPassword = 12345;

function checkPassword (){
	const passwordInput = document.getElementById("passwordInput").value;
	const errorMessage = document.getElementById("errorMessage");
	if (parseInt(passwordInput) === correctPassword) {
		// Якщо пароль вірний, ховаємо модальне вікно та показуємо форму
		document.getElementById("passwordModal").style.display = "none";
		document.getElementById("ordersDashboard").style.display = "block";
  } else {
		// Якщо пароль невірний, виводимо помилку
		errorMessage.textContent = "Väärä salasana. Yritä uudelleen.";
		errorMessage.classList.add("show");
		setTimeout(() => {
			errorMessage.classList.remove("show");
		}, 3000);
  }
}


document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('ordersContainer');

	// функція для керування видимістю кнопки видалення

	function updateDelBtnVisibility (status, button) {
		if (status === 'delivered') {
			button.classList.add('visible');
		} else {
			button.classList.remove('visible');
		}
	}

	function render(ordersToRender = null) {
		const orders = ordersToRender || JSON.parse(localStorage.getItem("orders")) || [];
		container.innerHTML = "";

		// ordersToRender = null Тобто якщо функцію render() викликають без аргументів, тоді ordersToRender автоматично буде null і JS не використовуватиме ordersToRender, а зрбить наступне (JSON.parse(localStorage.getItem("orders"))) 

		if (orders.length === 0) {
			container.innerHTML = "<p>Ei vielä tilauksia.</p>";
			return;
		}

		orders.forEach((order) => {
			const orderDiv = document.createElement("div");
			orderDiv.className = `order status-${order.status}`;

			orderDiv.innerHTML = `
				<h3>Tilauksen ID: ${order.id}</h3>
				<p><strong>Nimi:</strong> ${order.customerName}</p>
				<p><strong>Pannukakku:</strong> ${order.selectedPancake}</p>
				<p><strong>Täytteet:</strong> ${order.toppings.join(', ') || 'ei'}</p>
				<p><strong>Lisukkeet:</strong> ${order.extras.join(', ') || 'ei'}</p>
				<p><strong>Toimitus:</strong> ${order.deliveryMethod}</p>
				<p><strong>Hinta:</strong> ${order.totalPrice}</p>
				<label for="status"><strong>Status:</strong></label>
				<select class="statusSelect">
					<option value="awaits" ${order.status === 'awaits' ? 'selected' : ''}>odottaa</option>
					<option value="ready" ${order.status === 'ready' ? 'selected' : ''}>valmis</option>
					<option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>toimitettu</option>
				</select>
				<button class="delBtn" type="submit">Poista</button>
			`;

			// Показати кнопку видалення замовлення
			const delBtn = orderDiv.querySelector(".delBtn");
			updateDelBtnVisibility (order.status, delBtn);
			// Видалення замовлення
			delBtn.addEventListener("click", () => {
				const index = orders.findIndex(o => o.id === order.id);
				if (index > -1) {
					orders.splice(index, 1);
					localStorage.setItem("orders", JSON.stringify(orders));
				}
				render(); // перерендерити після видалення
			});
			
			// Зміна статусу
			const select = orderDiv.querySelector(".statusSelect");
			select.addEventListener('change', () => {
				order.status = select.value;
				orderDiv.classList.remove("status-awaits", "status-ready", "status-delivered");
				orderDiv.classList.add(`status-${order.status}`);
				updateDelBtnVisibility (order.status, delBtn);
				// Оновити статус в localStorage
				localStorage.setItem("orders", JSON.stringify(orders));
			});

			container.appendChild(orderDiv);
		});
	};
	render();

	// 🔁 Автоматичне оновлення при додаванні нового замовлення
	window.addEventListener('storage', (event) => {
		if (event.key === 'orders') {
			render();
		}
	});

	// пошук за введенними символами
	document.getElementById("search-field").addEventListener("keyup", (e) => {
		const enteredChar = document.getElementById("search-field").value.trim().toLowerCase();
		const orders = JSON.parse(localStorage.getItem("orders")) || [];
		const results = orders.filter(order => order.customerName.toLowerCase().includes(enteredChar));
		if(results.length > 0){
			render(results);
		} else {
			const text = document.getElementById("ordersContainer");
			text.innerHTML= "<p>Tilauksia ei löytynyt.</p>"
		}
	});

	// сортування за статусом замовлення
	document.getElementById("sort_btn").addEventListener("click", () => {
		const orders = JSON.parse(localStorage.getItem("orders")) || [];
		orders.sort((a,b) => {
			const statusOrder = ["awaits", "ready", "delivered"]; // порядок сортування
			return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
		})
		render(orders);
	})
});

