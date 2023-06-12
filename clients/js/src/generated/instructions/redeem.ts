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

// Accounts.
export type RedeemInstructionAccounts = {
  treeAuthority: PublicKey;
  leafOwner: Signer;
  leafDelegate: PublicKey;
  merkleTree: PublicKey;
  voucher: PublicKey;
  logWrapper: PublicKey;
  compressionProgram: PublicKey;
  systemProgram?: PublicKey;
};

// Data.
export type RedeemInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: bigint;
  index: number;
};

export type RedeemInstructionDataArgs = {
  root: Uint8Array;
  dataHash: Uint8Array;
  creatorHash: Uint8Array;
  nonce: number | bigint;
  index: number;
};

export function getRedeemInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<RedeemInstructionDataArgs, RedeemInstructionData> {
  const s = context.serializer;
  return mapSerializer<RedeemInstructionDataArgs, any, RedeemInstructionData>(
    s.struct<RedeemInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['root', s.bytes({ size: 32 })],
        ['dataHash', s.bytes({ size: 32 })],
        ['creatorHash', s.bytes({ size: 32 })],
        ['nonce', s.u64()],
        ['index', s.u32()],
      ],
      { description: 'RedeemInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [184, 12, 86, 149, 70, 196, 97, 225],
    })
  ) as Serializer<RedeemInstructionDataArgs, RedeemInstructionData>;
}

// Args.
export type RedeemInstructionArgs = RedeemInstructionDataArgs;

// Instruction.
export function redeem(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: RedeemInstructionAccounts & RedeemInstructionArgs
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
  signers.push(resolvedAccounts.leafOwner);
  keys.push({
    pubkey: resolvedAccounts.leafOwner.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.leafOwner, true),
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

  // Voucher.
  keys.push({
    pubkey: resolvedAccounts.voucher,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.voucher, true),
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
    getRedeemInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
