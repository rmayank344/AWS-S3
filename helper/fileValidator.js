const validateFileType = async (req, res, next) => {
    const { fileName } = req.body;
  if (!fileName) return res.status(400).json({ error: 'fileName is required' });

  const ext = fileName.split('.').pop().toLowerCase();
  const allowed = ['png', 'jpg', 'jpeg', 'pdf', 'mp4'];

  if (!allowed.includes(ext)) {
    return res.status(400).json({
      error: 'Only PNG, JPG, JPEG, MP4 and PDF files are allowed'
    });
  }

  next();
};

module.exports = {validateFileType};