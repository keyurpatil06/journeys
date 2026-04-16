'use client'

import TravelCard from "./TravelCard"

const Cards = ({ cards }: { cards: CardsProps }) => {
    return (
        <section className="p-4 bg-slate-700 rounded-2xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-white">Explore Places</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
                {cards.map((card) => (
                    <TravelCard
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        imgURL={card.imgURL}
                    />
                ))}
            </div>
        </section>
    )
}

export default Cards