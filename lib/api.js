export async function fetchFoodImage() {
  try {
    const res = await fetch('https://foodish-api.herokuapp.com/api/')
    if (!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()
    return data.image // URL string
  } catch (e) {
    console.error('Failed to fetch food image:', e)
    return null
  }
}
