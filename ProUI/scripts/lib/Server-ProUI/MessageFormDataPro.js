import { MessageFormData } from '@minecraft/server-ui';
/**
 * MessageFormDataPro类
 */
export class MessageFormDataPro {
    constructor(player) {
        this.player = player;
        this.form = new MessageFormData();
    }
    /**
     * 创建一个消息表单
     * @param title 标题
     * @param player 玩家
     * @returns MessageFormDataPro
     */
    static create(title, player) {
        return new MessageFormDataPro(player).title(title);
    }
    /**
     * 设置消息表单的标题
     * @param titleText 标题
     * @returns MessageFormDataPro
     */
    title(titleText) {
        this.form.title(titleText);
        return this;
    }
    /**
     * 设置消息表单的正文
     * @param bodyText 正文
     * @returns MessageFormDataPro
     */
    body(bodyText) {
        this.form.body(bodyText);
        return this;
    }
    button1(text, onClick) {
        this.form.button1(text);
        this.button1Callback = onClick;
        return this;
    }
    button2(text, onClick) {
        this.form.button2(text);
        this.button2Callback = onClick;
        return this;
    }
    /**
     * 添加一个确认按钮
     * @param text 按钮文本
     * @param onClick 点击回调
     * @returns MessageFormDataPro
     */
    confirm(text, onClick) {
        return this.button1(text, onClick);
    }
    /**
     * 添加一个取消按钮
     * @param text 按钮文本
     * @param onClick 点击回调
     * @returns MessageFormDataPro
     */
    cancel(text, onClick) {
        return this.button2(text, onClick);
    }
    /**
     * 当消息表单被取消时回调
     * @param callback 取消时回调
     * @returns MessageFormDataPro
     */
    onCancel(callback) {
        this.cancelCallback = callback;
        return this;
    }
    /**
     * 显示消息表单
     * @returns Promise<void>
     */
    async show() {
        const result = await this.form.show(this.player);
        if (result.canceled) {
            this.cancelCallback?.({
                cancelationReason: result.cancelationReason,
                canceled: result.canceled,
            });
        }
        else if (result.selection === 0) {
            this.button1Callback?.();
        }
        else if (result.selection === 1) {
            this.button2Callback?.();
        }
    }
}
