/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';
import {
  MetadataArgs,
  MetadataArgsArgs,
  getMetadataArgsSerializer,
} from '../types';

// Accounts.
export type UnverifyCreatorInstructionAccounts = {
  treeAuthority: PublicKey;
  leafOwner: PublicKey;
  leafDelegate: PublicKey;
  merkleTree: PublicKey;
  payer?: Signer;
  creator: Signer;
  logWrapper: PublicKey;
  compressionProgram: PublicKey;
  systemProgram?: PublicKey;
};

// Data.
export type UnverifyCreatorInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: bigint;
  index: number;
  message: MetadataArgs;
};

export type UnverifyCreatorInstructionDataArgs = {
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: number | bigint;
  index: number;
  message: MetadataArgsArgs;
};

export function getUnverifyCreatorInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  UnverifyCreatorInstructionDataArgs,
  UnverifyCreatorInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    UnverifyCreatorInstructionDataArgs,
    any,
    UnverifyCreatorInstructionData
  >(
    s.struct<UnverifyCreatorInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['root', s.bytes({ size: 32 })],
        ['dataHash', s.bytes({ size: 32 })],
        ['creatorHash', s.bytes({ size: 32 })],
        ['nonce', s.u64()],
        ['index', s.u32()],
        ['message', getMetadataArgsSerializer(context)],
      ],
      { description: 'UnverifyCreatorInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [107, 178, 57, 39, 105, 115, 112, 152],
    })
  ) as Serializer<
    UnverifyCreatorInstructionDataArgs,
    UnverifyCreatorInstructionData
  >;
}

// Args.
export type UnverifyCreatorInstructionArgs = UnverifyCreatorInstructionDataArgs;

// Instruction.
export function unverifyCreator(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: UnverifyCreatorInstructionAccounts & UnverifyCreatorInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'bubblegum',
      'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? context.payer);
  addObjectProperty(
    resolvingAccounts,
    'systemProgram',
    input.systemProgram ?? {
      ...context.programs.getPublicKey(
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isWritable: false,
    }
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Tree Authority.
  keys.push({
    pubkey: resolvedAccounts.treeAuthority,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.treeAuthority, false),
  });

  // Leaf Owner.
  keys.push({
    pubkey: resolvedAccounts.leafOwner,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.leafOwner, false),
  });

  // Leaf Delegate.
  keys.push({
    pubkey: resolvedAccounts.leafDelegate,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.leafDelegate, false),
  });

  // Merkle Tree.
  keys.push({
    pubkey: resolvedAccounts.merkleTree,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.merkleTree, true),
  });

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, false),
  });

  // Creator.
  signers.push(resolvedAccounts.creator);
  keys.push({
    pubkey: resolvedAccounts.creator.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.creator, false),
  });

  // Log Wrapper.
  keys.push({
    pubkey: resolvedAccounts.logWrapper,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.logWrapper, false),
  });

  // Compression Program.
  keys.push({
    pubkey: resolvedAccounts.compressionProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.compressionProgram, false),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Data.
  const data =
    getUnverifyCreatorInstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
