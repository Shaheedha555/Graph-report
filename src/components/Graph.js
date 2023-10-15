import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { ReactComponent as LocationIcon } from '../icons/location-share.svg';

function Graph({ jsonData, id }) {

    const [result, setResult] = useState([]);
    useEffect(() => {
        let result = [['', '']]
        if (jsonData && jsonData.data && Array.isArray(jsonData.data) && jsonData.keys) {
            const { data, keys } = jsonData;

            data.forEach(item => {
                const totalArrests = keys.reduce((sum, key) => sum + (item[key] || 0), 0);
                result.push([`${item['data_year']}`, totalArrests / 1000]);
            });
        } else {
            console.error('jsonData does not have the expected structure:', jsonData);
        }
        setResult(result);
    }, [jsonData])
    return <div id={id} style={{
        width: '800px', height: '500px',
        position: 'absolute', left: '2000px'
    }}>
        <div style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className='paragraph' style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', position: 'relative' }}>
                <LocationIcon />
                <p style={{ fontWeight: '500' }}>Crime</p>
            </div>
            <div style={{ backgroundColor: '#F2F4F5', borderRadius: '16px', position: 'relative' }}>
                <div style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px', backgroundColor: '#E8EEFB', position: 'absolute', top: '0', width: '100%', padding: ' 0 0', textAlign: 'left' }}>
                    <p style={{ margin: '0.5rem 1.5rem', fontWeight: '500', color: '#1463FF' }}>Burglary</p>
                </div>
                <div style={{ padding: '3.75rem 2.5rem 1.5rem' }}>
                    <div
                        style={{ border: 'none', borderRadius: '16px', backgroundColor: 'white', padding: '1rem 0' }}
                    >
                        <Chart
                            chartType="LineChart"
                            data={result}
                            options={{
                                legend: { position: "none" },

                                vAxis: {
                                    title: "Arrests",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Graph;
