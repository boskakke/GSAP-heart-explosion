import gsap from 'gsap'

const random = (min, max, round) => {
	return gsap.utils.random(min, max, round)
}

const hue = () => {
	const color = random(1, 2, 1)
	if (color === 1) {
		return random(0, 45, 0.1)
	} else {
		return random(287, 360, 0.1)
	}
}

const generateColor = () => {
	const color =
		'hsl(' +
		hue() +
		',' +
		random(50, 100, 0.1) +
		'%,' +
		random(41, 80, 0.1) +
		'%)'
	return color
}

const removeHearts = () => {
	const hearts = document.querySelectorAll('.heart-icon')
	hearts.forEach((heart, i) => {
		heart.remove()
	})
	heartsTimeline.eventCallback('onComplete', null)
}

const heartsTimeline = gsap.timeline()

heartsTimeline.addLabel('start')

const generateHearts = (e, x, y) => {

	const hearts = []
	const amount = random(50, 100, 1)
	for (let i = 0; i < amount; i++) {
		const heart = document.createElement('div')
		heart.innerHTML =
			'<svg class="heart-svg" viewBox="0 0 30 30" ><use xlink:href="#heart"></use></svg>'
		heart.classList.add('heart-icon')
		heart.style.setProperty('--fill', generateColor())
		heart.style.setProperty('--x', x)
		heart.style.setProperty('--y', y)

		e.currentTarget.parentNode.appendChild(heart)
		hearts.push(heart)
	}

	hearts.forEach((heart, index) => {
		const tl = gsap.timeline()
		tl.fromTo(
			heart,
			{ y: 0, opacity: 1 },
			{
				y: random(-400, 400, 1),
				x: random(-400, 400, 1),
				scale: random(1, 12, 0.1),
				opacity: 0,
				duration: random(0.5, 2.5, 0.1),
				// physics2D: {
				// 	velocity: random(200, 400, 1),
				// 	angle: random(180, 360, 1),
				// 	gravity: random(200, 700, 1),
				// 	acceleration: 50,
				// },
			},
			'<'
		)
		heartsTimeline.add(tl, 'start')
	})

	heartsTimeline.play(0)
	// .call(removeHearts)

}

const logo = document.querySelector('[data-logo]')

logo.addEventListener('click', function (e) {
	const rect = e.target.getBoundingClientRect()
	const x = e.clientX - rect.left + 'px' //x position within the element.
	const y = e.clientY - rect.top + 'px' //y position within the element.
	removeHearts()
	generateHearts(e, x, y)
})
