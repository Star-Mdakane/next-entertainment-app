import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    category: { type: String, enum: ['Movie', 'TV Series'] },
    rating: String,
    thumbnail: {
        regular: {
            large: String
        }
    },
    isTrending: Boolean
})

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema)