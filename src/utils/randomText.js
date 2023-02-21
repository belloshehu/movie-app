const texts = [
    'fury',
    'love',
    'war', 
    'pity',
    'joke',
    'friends',
    'business',
    'education',
    'market',
    'fight'
]

let randomIndex = Math.floor(Math.random() * 10)

export const getRandomText = () => texts[randomIndex]