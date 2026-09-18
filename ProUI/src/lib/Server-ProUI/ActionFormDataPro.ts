/**
 * MIT License By naitang_baka | 奶糖也不是很甜
 */

import { Player, RawMessage } from '@minecraft/server';
import { ActionFormData, ActionFormResponse, FormResponse } from '@minecraft/server-ui';

/**
 * ActionFormDataPro类
 */
export class ActionFormDataPro {
    private form: ActionFormData;
    private player: Player;
    private callbacks: Array<() => void> = [];
    private cancelCallback?: (cancelationReason: FormResponse) => void;

    private constructor(player: Player) {
        this.player = player;
        this.form = new ActionFormData();
    }

    /**
     * 创建一个操作表单
     * @param title 标题
     * @param player 玩家
     * @returns ActionFormDataPro
     */
    static create(title: RawMessage | string, player: Player): ActionFormDataPro {
        return new ActionFormDataPro(player).title(title);
    }

    /**
     * 设置操作表单的标题
     * @param text 标题
     * @returns ActionFormDataPro
     */
    public title(text: RawMessage | string): ActionFormDataPro {
        this.form.title(text);
        return this;
    }

    /**
     * 设置操作表单的主体
     * @param text 主文本
     * @returns ActionFormDataPro
     */
    public body(text: RawMessage | string): ActionFormDataPro {
        this.form.body(text);
        return this;
    }

    /**
     * 添加一个分隔线
     * @returns ActionFormDataPro
     */
    public divider(): ActionFormDataPro {
        this.form.divider();
        return this;
    }

    /**
     * 设置操作表单的标题
     * @param text 标题
     * @returns ActionFormDataPro
     */
    public header(text: RawMessage | string): ActionFormDataPro {
        this.form.header(text);
        return this;
    }

    /**
     * 设置操作表单的标签
     * @param text 标签
     * @returns ActionFormDataPro
     */
    public label(text: RawMessage | string): ActionFormDataPro {
        this.form.label(text);
        return this;
    }

    /**
     * 添加一个按钮
     * @param text 按钮文本
     * @param onClick 点击回调
     * @returns ActionFormDataPro
     */
    public button(text: RawMessage | string, onClick: () => void): ActionFormDataPro;
    /**
     * 添加一个按钮
     * @param text 按钮文本
     * @param iconPath 图标路径
     * @param onClick 点击回调
     * @returns ActionFormDataPro
     */
    public button(text: RawMessage | string, iconPath: string, onClick: () => void): ActionFormDataPro;
    /**
     * 添加一个按钮
     * @param text 按钮文本
     * @param iconOrOnClick 图标路径或点击回调
     * @param onClick 点击回调
     * @returns ActionFormDataPro
     */
    public button(text: RawMessage | string, iconOrOnClick: string | (() => void), onClick?: () => void): ActionFormDataPro {
        if (typeof iconOrOnClick === 'string') {
            this.form.button(text, iconOrOnClick);
            this.callbacks.push(onClick!);
        } else {
            this.form.button(text);
            this.callbacks.push(iconOrOnClick);
        }
        return this;
    }

    /**
     * 当操作表单被取消时回调
     * @param callback 取消时回调
     * @returns ActionFormDataPro
     */
    public onCancel(callback: (cancelationReason: FormResponse) => void): ActionFormDataPro {
        this.cancelCallback = callback;
        return this;
    }

    /**
     * 显示操作表单
     * @returns Promise<void>
     */
    public async show(): Promise<void> {
        const result: ActionFormResponse = await this.form.show(this.player);
        if (result.canceled) {
            this.cancelCallback?.({
                cancelationReason: result.cancelationReason,
                canceled: result.canceled,
            });
        } else if (result.selection !== undefined && this.callbacks[result.selection]) {
            this.callbacks[result.selection]();
        }
    }
}