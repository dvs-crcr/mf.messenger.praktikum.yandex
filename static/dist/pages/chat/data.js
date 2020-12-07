export const chatList = [
    {
        id: 1,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'Константин Константинопольский',
        lastmsg: 'изображение',
        time: '15:00',
        count: '1'
    },
    {
        id: 2,
        isActive: true,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'Антошка',
        lastmsg: 'Пошли копать картошку, дили-дили-трали-вали это мы не проходили, это нам не задавали',
        time: '9:57',
        isSelf: true
    },
    {
        id: 3,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'Паша Работа',
        lastmsg: 'Привет! Как дела?',
        time: 'Вс',
        count: '1'
    },
    {
        id: 4,
        avatar: '/assets/img/avatar_50x50.png',
        title: '10 Невероятных фактов',
        lastmsg: 'Факт №1. А вы знали, что у длинноголового хвостоклювиков совсем нет хвоста сзади, он у них болтается спереди',
        time: 'Сб'
    },
    {
        id: 5,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'TEDx',
        lastmsg: 'Лекция о том как стать фронтенд разаработчиком и не быть полным нулём в бэкенде',
        time: 'Сб'
    },
    {
        id: 6,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'Иван Иванович',
        lastmsg: 'Иван Иванович, добрый день. Хочу напомнить про встрече, запланированной на завтра.',
        time: 'Пт',
        isSelf: true
    },
    {
        id: 7,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'Жена',
        lastmsg: 'Хлеб, молоко, индейка, овощи, йогурт детям, корм для кошки, заедь в гараж за картошкой. привет',
        time: 'Чт',
        count: '99+'
    },
    {
        id: 8,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'КиноНаходка...',
        lastmsg: 'Только у нас все премьеры этой недели в отличном качестве!',
        time: 'Чт',
        count: '14'
    },
    {
        id: 9,
        avatar: '/assets/img/avatar_50x50.png',
        title: '1-2-3',
        lastmsg: 'ОК',
        time: 'Ср',
        isSelf: true
    },
    {
        id: 10,
        avatar: '/assets/img/avatar_50x50.png',
        title: 'Вася Диагност',
        lastmsg: 'Машина готова, приезжай',
        time: 'Ср',
        count: '1'
    }
];
export const chatContentData = {
    title: 'Антошка',
    avatar: '/assets/img/avatar_30x30.png',
    messageList: [
        {
            type: 'date',
            msgContent: '19 ноября'
        },
        {
            type: 'text',
            msgContent: `
Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.   

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
            time: '08:56'
        },
        {
            type: 'image',
            msgContent: '/assets/img/message_img_640x400.png',
            time: '08:56'
        },
        {
            isSelf: true,
            status: 'read',
            type: 'text',
            msgContent: 'Пошли копать картошку, дили-дили-трали-вали это мы не проходили, это нам не задавали...',
            time: '09:57'
        }
    ]
};
//# sourceMappingURL=data.js.map