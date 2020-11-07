import React from 'react';


const Home = () => {
    return(
        <section className="p-8 h-screen flex justify-center items-start">
            <div className="container text-center shadow bgColorHomePage">
                <div className="description p-4 align-middle">
                    <p className="py-2 font-medium">System rezerwacji, jest to aplikacja mająca na celu ułatwienie rezerwowania stolików w restauracjach, kawiarniach i barach.</p>
                    <p className="py-2 font-medium">Aplikacja typu Full-stack, składająca się z Front-endu napisanego z wykorzystaniem React.js oraz Tailwind CSS, zaś back-end oparty jest na Node.js wraz z biblioteką express.js.</p>
                    <p className="py-2 font-medium">Za komunikację pomiędzy front-end, a back-end odpowiada GraphQL, zaś baza danych aplikacji jest typem bazy NOSQL i znajduje się na serwisie MLab.</p>
                    <p className="py-2 font-medium">System rezerwacji blokuje stolik od możliwości ponownego zarezerwowania go na pełną godzinę. Stolik można zarezerwować w przedziale od 08:00 do 21:00, najwcześniej dnia następnego.</p>
                </div>
            </div>
        </section>
    )
}

export default Home;