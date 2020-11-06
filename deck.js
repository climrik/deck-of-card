

class Card
 {
    constructor(suit, rank, updown)
    {
        this.suit = suit;
        this.rank = rank;
        this.updown = updown;
        this.x = 10;
        this.y = 10;
    }

    render(charImage, x, y)
    {
        this.x = x;
        this.y = y;
        if (this.updown)
        {
            ctx.drawImage(charImage, this.rank*GRID_W, this.suit*GRID_H,
                GRID_W, GRID_H, x, y, GRID_W, GRID_H);
        }
        else
        {
            ctx.drawImage(charImage, 2*GRID_W, 4*GRID_H,
                GRID_W, GRID_H, x, y, GRID_W, GRID_H);
        }
    }

    render2(charImage)
    {
        if (this.updown)
        {
            ctx.drawImage(charImage, this.rank*GRID_W, this.suit*GRID_H,
                GRID_W, GRID_H, this.x, this.y, GRID_W, GRID_H);
        }
        else
        {
            ctx.drawImage(charImage, 2*GRID_W, 4*GRID_H,
                GRID_W, GRID_H, this.x, this.y, GRID_W, GRID_H);
        }
    }

    render3(charImage)
    {
        if (this.updown)
        {
            ctx.drawImage(charImage, this.rank*GRID_W, this.suit*GRID_H,
                GRID_W, GRID_H, 0, 0, GRID_W/2, GRID_H/2);
        }
        else
        {
            ctx.drawImage(charImage, 2*GRID_W, 4*GRID_H,
                GRID_W, GRID_H, 0, 0, GRID_W/2, GRID_H/2);
        }
    }
}

class Pile 
{
    constructor(x, y) 
    {
        this.cards = [];
        this.x = x;
        this.y = y;
    }

    push(card)
    {
        this.cards.push(card);
    }

    render(charImage) 
    {
        if (this.cards.length == 0)
        {
            ctx.drawImage(charImage, 3*GRID_W, 4*GRID_H, GRID_W, GRID_H,
                 this.x, this.y, GRID_W,GRID_H);
        }
        else
        {
            var offset = 0;
            //var card;
            for (var card in this.cards)
            {
                this.cards[card].render(charImage, this.x, this.y+offset);
                offset = offset + 4;
            }
        }
    }
}
