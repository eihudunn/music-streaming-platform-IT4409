import mongoose, { models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    avatarImg: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg',
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    searchTitle: {
      type: String,
    },
    password: {
      type: String,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    artistFollowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
      },
    ],
    albumsFollowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
      },
    ],
    likedTracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
      },
    ],
    preferedGenre: [
      {
        genre: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = models?.User || mongoose.model('User', UserSchema);
export default User;

export interface UserDto {
  id: string;
  username: string;
  searchTitle?: string;
  avatarImg?: string;
  email?: string;
  password?: string;
  following?: string[];
  artistFollowed?: string[];
  playlists?: string[];
  albumsFollowed?: string[];
  likedTracks?: string[];
  preferedGenre?: {
    genre: string;
    weight: number;
  }[];
}
