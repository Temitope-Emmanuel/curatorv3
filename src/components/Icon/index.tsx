import React from 'react';
import {IconProps} from '../../interfaces/content';
// import AccountIcon from './Account';
import AddIcon from './Add';
import AddCommentIcon from './AddComment';
import AddReactionIcon from './AddReaction';
import ArrowBackIcon from './ArrowBack';
import CheckIcon from './Check';
import CloseIcon from './Close';
import DeleteForeverIcon from './DeleteForever';
import DownloadIcon from './Download';
import DropdownIcon from './Dropdown';
import EditBorderIcon from './EditBorder';
import EmptyAudioIcon from './EmptyAudio';
import EmptySnippetIcon from './EmptySnippet';
import FastForwardIcon from './FastForward';
import FastRewindIcon from './FastRewind';
import FavoriteIcon from './Favorite';
import Forward10Icon from './Forward10';
import GoogleIcon from './Google';
import GraphicEqIcon from './GraphicEq';
// import LibraryAddIcon from './LibraryAdd';
import LocalFireDepartmentIcon from './LocalFireDepartment';
import MoreIcon from './More';
import NoteIcon from './Note';
// import NotificationActive from './NotificationActive';
import PauseIcon from './Pause';
import PersonAddIcon from './PersonAdd';
import PlayCircle from './PlayCircle';
import PodcastIcon from './Podcast';
import PublicIcon from './Public';
import QueueIcon from './Queue';
import RecommendIcon from './Recommend';
import Replay10Icon from './Replay10';
import SearchIcon from './Search';
import SignoutIcon from './Signout';
import SilentIcon from './Silent';
// import SplashScreen1Svg from './splashScreen1';
// import SplashScreen2Svg from './splashScreen2';
import SplashScreen3Svg from './splashScreen3';
// import TakingNoteIcon from './TakingNote';
import UploadIcon from './Upload';
import EditIcon from './Edit';
import VerifiedIcon from './Verified';
import DeleteIcon from './Delete';
import StarIcon from './Star';
import AlternateEmailIcon from './AlternateEmail'

export const IconImage: React.FC<
  Pick<IconProps, 'name' | 'width' | 'fill'>
> = ({name, fill, width}) => {
  switch (name) {
    // case 'SplashScreen1':
    // 	return <SplashScreen1Svg width={width} />;
    // case 'SplashScreen2':
    // 	return <SplashScreen2Svg width={width} />;
    // case 'SplashScreen3':
    // 	return <SplashScreen3Svg width={width} />;
    case 'add':
      return <AddIcon {...{width, fill}} />;
    case 'podcast':
    	return <PodcastIcon width={width} />;
    case 'search':
    	return <SearchIcon fill={fill} width={width} />;
    case 'google':
    	return <GoogleIcon width={width} />;
    case 'signout':
    	return <SignoutIcon width={width} />;
    case 'more':
    	return <MoreIcon fill={fill} width={width} />;
    // case 'library-add':
    // 	return <LibraryAddIcon width={width} />;
    case 'download':
    	return <DownloadIcon fill={fill} width={width} />;
    // case 'play-circle':
    // 	return <PlayCircle width={width} />;
    case 'arrow-back':
    	return <ArrowBackIcon {...{width, fill}} />;
    case 'dropdown':
    	return <DropdownIcon width={width} />;
    case 'empty-audio':
    	return <EmptyAudioIcon width={width} />;
    case 'graphic-eq':
    	return <GraphicEqIcon width={width} />;
    case 'note':
    	return <NoteIcon width={width} />;
    case 'queue':
    	return <QueueIcon width={width} />;
    case 'fast-rewind':
    	return <FastRewindIcon {...{ width }} />;
    case 'replay-10':
    	return <Replay10Icon {...{ width }} />;
    case 'play':
    	return <PlayCircle {...{ width }} />;
    case 'forward-10':
    	return <Forward10Icon {...{ width }} />;
    case 'fast-forward':
    	return <FastForwardIcon {...{ width }} />;
    case 'add-reaction':
    	return <AddReactionIcon {...{ width, fill }} />;
    case 'favorite':
    	return <FavoriteIcon {...{ width, fill }} />;
    case 'local-fire-department':
    	return <LocalFireDepartmentIcon {...{ width, fill }} />;
    case 'recommend':
    	return <RecommendIcon {...{ width, fill }} />;
    // case 'taking-note':
    // 	return <TakingNoteIcon {...{ width }} />;
    case 'add-comment':
    	return <AddCommentIcon {...{ width }} />;
    // case 'notifications-active':
    // 	return <NotificationActive fill={fill} {...{ width }} />;
    case 'person-add':
    	return <PersonAddIcon {...{ width }} />;
    case 'public':
    	return <PublicIcon {...{ width }} />;
    case 'silent':
    	return <SilentIcon {...{ width }} />;
    // case 'account':
    // 	return <AccountIcon {...{ width }} />;
    case 'delete-forever':
    	return <DeleteForeverIcon {...{ width, fill }} />;
    case 'edit-border':
    	return <EditBorderIcon {...{ width }} />;
    case 'pause':
    	return <PauseIcon {...{ width }} />;
    case 'check':
    	return <CheckIcon {...{ width }} />;
    case 'close':
    	return <CloseIcon {...{ width, fill }} />;
    case 'empty-snippet':
    	return <EmptySnippetIcon {...{ width }} />;
    case 'upload':
    	return <UploadIcon {...{ width }} />;
    case 'edit':
    	return <EditIcon {...{ width, fill }} />;
    case 'verified':
    	return <VerifiedIcon {...{ width }} />;
    case 'delete':
    	return <DeleteIcon {...{ width }} />;
    case 'star':
    	return <StarIcon {...{ width }} />;
    case 'alternate-email':
    	return <AlternateEmailIcon {...{ width }} />;
    default:
      return <SplashScreen3Svg width={width} />;
  }
};

export default IconImage;
