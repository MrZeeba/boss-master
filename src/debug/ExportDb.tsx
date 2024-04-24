import * as Sharing from 'expo-sharing';
import LocalDb from '../sqlite/LocalDb';

export const ExportDb = async () => {
  await Sharing.shareAsync(LocalDb.DATABASE_PATH);
};
