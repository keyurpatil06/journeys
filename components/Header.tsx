const Header = ({ user }: { user: string }) => {
    return (
        <div className="bg-orange-400 p-2 rounded-xl">
            <h1 className="text-3xl ">
                Welcome {user}
            </h1>
            <p className="text-xl">Browse and travel places!</p>
        </div>
    )
}

export default Header