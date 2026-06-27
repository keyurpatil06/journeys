const OfflinePage = () => {
    return (
        <main>
            <h1>You're offline</h1>
            <p>Please reconnect to continue using {process.env.NEXT_PUBLIC_APP_NAME}.</p>
        </main>
    )
}

export default OfflinePage
