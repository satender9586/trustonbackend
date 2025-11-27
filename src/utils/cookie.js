const cookieAccessOptions = {
    maxAge: 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
}
const cookieRefreshOptions = {
    maxAge: 30 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
}

module.exports = {cookieAccessOptions,cookieRefreshOptions}