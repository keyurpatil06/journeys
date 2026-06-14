const Header = ({ user }: { user: User }) => {

    return (
        <div className="bg-amber-400 p-2 flex justify-between items-center">
            <div>
                <h1 className="text-3xl">
                    Welcome {user.name}
                </h1>
                <p className="text-xl">Browse and travel places!</p>
            </div>
        </div>
    )
}

export default Header