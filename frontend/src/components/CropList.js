import { useState, useEffect } from "react";
import axios from 'axios';

const CropList = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/crops');
                setCrops(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching crops: ", crops);
                setLoading(false);
            }
        }

        fetchCrops();
    }, []);

    if(loading) return <p>Loading Crops...</p>

    return (
        <div>
            <h2>Crops List</h2>
            {crops.length === 0? (
                <p>No Crops Found</p>
            ) : (
                <ul>
                    {crops.map(crop => (
                        <li key={crop._id}>
                            <strong>{crop.name}</strong> - Soil Type: {crop.soilType}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CropList;