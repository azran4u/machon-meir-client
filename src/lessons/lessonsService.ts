import { RabbiEnum } from "../model/rabi.enum";
import { Snapshot, SnapshotSerializable } from "../model/snapshot";
import {
  AnonymousCredential,
  BlobDownloadResponseParsed,
  BlobServiceClient,
  ContainerClient,
} from "@azure/storage-blob";
import { config } from "../config/config";

export async function fetchLessonsByRabbi(
  rabbi: RabbiEnum
): Promise<SnapshotSerializable> {
  let blobServiceClient: BlobServiceClient;
  let containerClient: ContainerClient;
  try {
    blobServiceClient = new BlobServiceClient(
      config.objectStorage.connectionString,
      new AnonymousCredential()
    );
    containerClient = blobServiceClient.getContainerClient(
      config.objectStorage.containerName
    );
  } catch (error) {
    throw new Error(`initializtion of object storage failed ${error}`);
  }

  const blobs: string[] = [];
  try {
    for await (const blob of containerClient.listBlobsFlat()) {
      blobs.push(blob.name);
    }
  } catch (error) {
    throw new Error(
      `list container objects ${containerClient.containerName} failed ${error}`
    );
  }
  const snapshots = blobs.map((blob) => blobNameToSnapshot(blob));
  const rabbiSnapshots = snapshots.filter(
    (snapshot) => snapshot.rabbi === rabbi
  );

  const lastSnapshot = rabbiSnapshots.reduce(
    (prev, curr) => {
      if (curr.date.getTime() > prev.date.getTime())
        return { rabbi: rabbi, date: curr.date, lessons: prev.lessons };
      else return prev;
    },
    { rabbi: rabbi, date: new Date(0), lessons: [] }
  );

  const blobName = snapshotToBlobName(lastSnapshot);
  const blocbClient = containerClient.getBlobClient(blobName);
  let downloadBlockBlobResponse: BlobDownloadResponseParsed;
  let content: string;
  try {
    downloadBlockBlobResponse = await blocbClient.download();
    const blob = await downloadBlockBlobResponse.blobBody;
    content = await blob.text();
  } catch (error) {
    throw new Error(`downloading blob ${blobName} failed ${error}`);
  }
  return {
    lessons: content,
    rabbi: lastSnapshot.rabbi,
    date: lastSnapshot.date.getTime(),
  };
}

function blobNameToSnapshot(blobName: string): Snapshot {
  const res = blobName.split(";;");
  if (res.length !== 2) throw new Error(`blob name ${blobName} is invalid`);
  const [rabbi, time] = res;
  return {
    rabbi: RabbiEnum[rabbi],
    date: new Date(+time),
    lessons: [],
  };
}

function snapshotToBlobName(snapshot: Snapshot): string {
  return `${snapshot.rabbi};;${snapshot.date.getTime()}`;
}
