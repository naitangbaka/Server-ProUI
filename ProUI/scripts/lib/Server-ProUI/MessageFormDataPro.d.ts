/**
 * MIT License By naitang_baka | 奶糖也不是很甜
 */

import { Player, RawMessage } from '@minecraft/server';
import { FormResponse } from '@minecraft/server-ui';

/**
 * MessageFormDataPro类
 */
export class MessageFormDataPro {
    private constructor(player: Player);

    /**
     * 创建一个消息表单
     * @param title 标题
     * @param player 玩家
     * @returns MessageFormDataPro
     */
    static create(title: RawMessage | string, player: Player): MessageFormDataPro;

    /**
     * 设置消息表单的标题
     * @param titleText 标题
     * @returns MessageFormDataPro
     */
    title(titleText: RawMessage | string): MessageFormDataPro;

    /**
     * 设置消息表单的正文
     * @param bodyText 正文
     * @returns MessageFormDataPro
     */
    body(bodyText: RawMessage | string): MessageFormDataPro;

    /**
     * 添加一个确认按钮
     * @param text 按钮文本
     * @param onClick 点击回调
     * @returns MessageFormDataPro
     */
    confirm(text: RawMessage | string, onClick?: () => void): MessageFormDataPro;

    /**
     * 添加一个取消按钮
     * @param text 按钮文本
     * @param onClick 点击回调
     * @returns MessageFormDataPro
     */
    cancel(text: RawMessage | string, onClick?: () => void): MessageFormDataPro;

    /**
     * 当消息表单被取消时回调
     * @param callback 取消时回调
     * @returns MessageFormDataPro
     */
    onCancel(callback: (cancelationReason: FormResponse) => void): MessageFormDataPro;

    /**
     * 显示消息表单
     * @returns Promise<void>
     */
    show(): Promise<void>;
}