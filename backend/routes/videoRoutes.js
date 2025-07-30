// Get all uploaded videos
router.get('/all-videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router