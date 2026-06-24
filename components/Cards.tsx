import TravelCard from "./TravelCard"

const Cards = ({ cards }: { cards: CardsProps }) => {
    return (
        <section className="p-4 border border-[#d6c3a4] bg-[#fff2dc] rounded-3xl shadow-2xl">
            <h1 className="text-3xl font-semibold text-center mb-6 text-amber-900">Trending Lists</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-4">
                {cards.map((card) => (
                    <TravelCard
                        key={card._id}
                        id={card._id}
                        title={card.title}
                        description={card.tripDescription}
                        imgURL={card.coverImage}
                    />
                ))}
            </div>
        </section>
    )
}

export default Cards