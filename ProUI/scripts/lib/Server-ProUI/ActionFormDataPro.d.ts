/**
 * MIT License By naitang_baka | 奶糖也不是很甜
 */

import { Player, RawMessage } from '@minecraft/server';
import { FormResponse } from '@minecraft/server-ui';

/**
 * ActionFormDataPro类
 */
export class ActionFormDataPro {
    private constructor(player: Player);

    /**
     * 创建一个操作表单
     * @param title 标题
     * @param player 玩家
     * @returns ActionFormDataPro
     */
    static create(title: RawMessage | string, player: Player): ActionFormDataPro;

    /**
     * 设置操作表单的标题
     * @param text 标题
     * @returns ActionFormDataPro
     */
    title(text: RawMessage | string): ActionFormDataPro;

    /**
     * 设置操作表单的主体
     * @param text 主文本
     * @returns ActionFormDataPro
     */
    body(text: RawMessage | string): ActionFormDataPro;

    /**
     * 添加一个分隔线
     * @returns ActionFormDataPro
     */
    divider(): ActionFormDataPro;

    /**
     * 设置操作表单的标题
     * @param text 标题
     * @returns ActionFormDataPro
     */
    header(text: RawMessage | string): ActionFormDataPro;

    /**
     * 设置操作表单的标签
     * @param text 标签
     * @returns ActionFormDataPro
     */
    label(text: RawMessage | string): ActionFormDataPro;

    /**
     * 添加一个按钮
     * @param text 按钮文本
     * @param onClick 点击回调
     * @returns ActionFormDataPro
     */
    button(text: RawMessage | string, onClick: () => void): ActionFormDataPro;
    /**
     * 添加一个按钮
     * @param text 按钮文本
     * @param iconPath 图标路径
     * @param onClick 点击回调
     * @returns ActionFormDataPro
     */
    button(text: RawMessage | string, iconPath: string, onClick: () => void): ActionFormDataPro;

    /**
     * 当操作表单被取消时回调
     * @param callback 取消时回调
     * @returns ActionFormDataPro
     */
    onCancel(callback: (cancelationReason: FormResponse) => void): ActionFormDataPro;

    /**
     * 显示操作表单
     * @returns Promise<void>
     */
    show(): Promise<void>;
}