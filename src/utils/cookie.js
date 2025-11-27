const cookieOptions = {
    maxAge: 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
}

module.exports = cookieOptions