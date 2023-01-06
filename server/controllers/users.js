import User from '../models/User'

//READ
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (err){
        res.status(404).json({ message: error.message })
    }
}

export const getUserFriends = async (res, req) => {
    try{
        const { id } = req.params;
        const user = await User.findbyId(id);
    
        const friends = await Promise.all(
            user.friends.map(() => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );
    
        res.status(200).json(formattedFriends)
    } catch (err){
        res.status(404).json({ message: error.message })
    }
}

//UPDATE
const addRemoveFriend = async (res, req) => {
    try{
        const { id, friendId} = req.params
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map(() => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );
        res.status(200).json(formattedFriends)
    } catch (err){
        res.status(404).json({ message: error.message })
    }
}