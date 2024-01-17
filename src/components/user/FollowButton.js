import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import { Star, StarFill } from 'react-bootstrap-icons';
import '../../styles/user/FollowButton.css';

function FollowButton({ player = false, team = false, user, notifySuccess, notifyError }) {
	const [isFollowing, setIsFollowing] = useState(false);
	const handleFollow = async () => {
		if (!player) {
			try {
				await OnlyLocksAPI.followTeam({ username: localStorage.username, teamId: team.id });
				notifySuccess(`You are now following the ${team.name}!`);
				setIsFollowing(true);
			} catch (err) {
				notifyError(err);
			}
		} else {
			try {
				await OnlyLocksAPI.followPlayer({ username: localStorage.username, playerId: player.id });
				notifySuccess(`You are now following ${player.name}!`);
				setIsFollowing(true);
			} catch (err) {
				notifyError(err);
			}
		}
	};
	const handleUnfollow = async () => {
		if (!player) {
			try {
				await OnlyLocksAPI.unfollowTeam({ username: localStorage.username, teamId: team.id });
				notifySuccess(`You have unfollowed the ${team.name}.`);
				setIsFollowing(false);
			} catch (err) {
				notifyError(err);
			}
		} else {
			try {
				await OnlyLocksAPI.unfollowPlayer({ username: localStorage.username, playerId: player.id });
				notifySuccess(`You have unfollowed ${player.name}.`);
				setIsFollowing(false);
			} catch (err) {
				notifyError(err);
			}
		}
	};
	useEffect(() => {
		console.log('TEAM:', team);
		console.log('PLAYER:', player);
		if (!player) {
			user.following.teams.forEach((t) => {
				if (t.id === team.id) setIsFollowing(true);
			});
		} else {
			user.following.players.forEach((p) => {
				if (p.id === player.id) setIsFollowing(true);
			});
		}
	}, [user, player, team]);

	if (isFollowing) {
		return (
			<Button className="unfollow-button pb-2 pt-0 text-center" onClick={handleUnfollow}>
				<StarFill></StarFill>
			</Button>
		);
	} else {
		return (
			<Button className="follow-button pb-2 pt-0 text-center" onClick={handleFollow}>
				<Star></Star>
			</Button>
		);
	}
}

export default FollowButton;
