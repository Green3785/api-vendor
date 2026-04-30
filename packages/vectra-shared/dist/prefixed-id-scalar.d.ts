import { CustomScalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
export declare class PrefixedID implements CustomScalar<string, string> {
    description: string;
    serialize(value: unknown): string;
    parseValue(value: unknown): string;
    parseLiteral(ast: ValueNode): string;
}
