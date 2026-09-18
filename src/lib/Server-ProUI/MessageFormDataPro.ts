/**
 * MIT License By naitang_baka | 奶糖也不是很甜
 */
import { Player, RawMessage } from '@minecraft/server';
import { FormResponse, MessageFormData, MessageFormResponse } from '@minecraft/server-ui';

/**
 * MessageFormDataPro类
 */
export class MessageFormDataPro {
    private form: MessageFormData;
    private player: Player;
    private button1Callback?: () => void;
    private button2Callback?: () => void;
    private cancelCallback?: (cancelationReason: FormResponse) => void;

    private constructor(player: Player) {
        this.player = player;
        this.form = new MessageFormData();
    }

    /**
     * 创建一个消息表单
     * @param title 标题
     * @param player 玩家
     * @returns MessageFormDataPro
     */
    static create(title: RawMessage | string, player: Player): MessageFormDataPro {
        return new MessageFormDataPro(player).title(title);
    }

    /**
     * 设置消息表单的标题
     * @param titleText 标题
     * @returns MessageFormDataPro
     */
    public title(titleText: RawMessage | string): MessageFormDataPro {
        this.form.title(titleText);
        return this;
    }

    /**
     * 设置消息表单的正文
     * @param bodyText 正文
     * @returns MessageFormDataPro
     */
    public body(bodyText: RawMessage | string): MessageFormDataPro {
        this.form.body(bodyText);
        return this;
    }

    private button1(text: RawMessage | string, onClick?: () => void): MessageFormDataPro {
        this.form.button1(text);
        this.button1Callback = onClick;
        return this;
    }

    private button2(text: RawMessage | string, onClick?: () => void): MessageFormDataPro {
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
    public confirm(text: RawMessage | string, onClick?: () => void): MessageFormDataPro {
        return this.button1(text, onClick);
    }

    /**
     * 添加一个取消按钮
     * @param text 按钮文本
     * @param onClick 点击回调
     * @returns MessageFormDataPro
     */
    public cancel(text: RawMessage | string, onClick?: () => void): MessageFormDataPro {
        return this.button2(text, onClick);
    }

    /**
     * 当消息表单被取消时回调
     * @param callback 取消时回调
     * @returns MessageFormDataPro
     */
    public onCancel(callback: (cancelationReason: FormResponse) => void): MessageFormDataPro {
        this.cancelCallback = callback;
        return this;
    }

    /**
     * 显示消息表单
     * @returns Promise<void>
     */
    public async show(): Promise<void> {
        const result: MessageFormResponse = await this.form.show(this.player);

        if (result.canceled) {
            this.cancelCallback?.({
                cancelationReason: result.cancelationReason!,
                canceled: result.canceled,
            });
        } else if (result.selection === 0) {
            this.button1Callback?.();
        } else if (result.selection === 1) {
            this.button2Callback?.();
        }
    }
}