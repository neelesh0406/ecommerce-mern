import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getOrders } from '../helpers/url';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function AdminChart() {
    const [placed, setPlaced] = useState(0);
    const [delivered, setDelivered] = useState(0);

    useEffect(() => {

        fetch(getOrders, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem('token')
            },
        })
            .then(response => response.json())
            .then(data => {
                let p = 0;
                let d = 0;
                data.length && data.filter(item => {
                    if (item.status === 'placed') {
                        p += 1;
                    }
                    if (item.status === 'delivered') {
                        d += 1;
                    }
                })
                setPlaced(p);
                setDelivered(d);
            });
    }, [])

    const data = {
        labels: ['Orders Placed', 'Orders Delivered'],
        datasets: [
            {
                label: '# of Orders',
                data: [placed, delivered],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <div className='admin-chart'>
        <Pie data={data} />
    </div>;
}
