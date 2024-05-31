function congratulationForm(username, text) {
  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="text-align: center; color: #ff6347;">Congratulation, ${username}</h1>
    <div style="background-color: #f2f2f2; padding: 10px; margin: 20px 0;">
      <p style="font-size: 16px;">${text}</p>
      <p style="font-size: 14px;">This is a testament to the amazing experience your music have provided to us. Keep up the great work and continue to strive for excellence!</p>
    </div>
    <hr style="border-top: 1px solid #ccc; margin: 20px 0;">
    <div style="text-align: left; font-size: 14px;">
      <p>BK Music app</p>
      <p>Email: bkmusicstreamingapp@gmail.com</p>
      <p>Phone number: 0123456789</p>
    </div>
  </div>
  `;
}

function newAlbumForm(artistName, albumName, hrefLink) {
  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="text-align: center; color: #ff6347;">New album released!</h1>
    <div style="background-color: #f2f2f2; padding: 10px; margin: 20px 0;">
      <p style="font-size: 16px;">Your followed artist: ${artistName} has just released a new album called ${albumName}. Check it out now!</p>
      <a href="${hrefLink}">Click here to redirect to the album</a>
    </div>
    <hr style="border-top: 1px solid #ccc; margin: 20px 0;">
    <div style="text-align: left; font-size: 14px;">
        <p>BK Music app</p>
        <p>Email: bkmusicstreamingapp@gmail.com</p>
        <p>Phone number: 0123456789</p>
    </div>
  </div>`
}
module.exports = { congratulationForm, newAlbumForm };