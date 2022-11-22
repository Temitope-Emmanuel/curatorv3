import * as ROUTES from '../constants/routes';
import { IMedia } from './Media';

export type RootStackParamList = {
    [ROUTES.HomeScreen]: undefined;
    [ROUTES.SplashScreen]: undefined;
    [ROUTES.PlayerScreen]: {
        media: IMedia;
    };
    [ROUTES.NotificationScreen]: undefined;
}