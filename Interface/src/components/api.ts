export async function fetchDataFromAPI() {
    const [data, setData] = useState({ temperature: 0, humidity: 0, light: 0 });

    try {
        const response = await fetch('http://localhost:5174/index.php');
        const apiData = await response.json();
        console.log(apiData)
        return {

        };

    } catch (error) {
        console.error('Une erreur s\'est produite:', error);
    }
}
