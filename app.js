app.get('/README.html', (req, res) => {
    res.status(200).send('0K');
})

app.use(express.static('../'));

app.listen(80, () => {
    console.log("Server is running on port 80");
});