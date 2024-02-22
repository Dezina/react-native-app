import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

interface Card {
    id: number;
    color: string;
    image: string;
    name: string;
    points: number;
}

const cardData: Card[] = [
    { id: 1, color: 'red', image: 'https://cdn2.iconfinder.com/data/icons/animals/256/Panda.png', name: 'Panda', points: 10 },
    { id: 2, color: 'green', image: 'https://cdn0.iconfinder.com/data/icons/isometric-farm-animals/320/cow-01-512.png', name: 'Cow', points: 10 },
    { id: 3, color: 'blue', image: 'https://cdn2.iconfinder.com/data/icons/animals/256/Dolphin.png', name: 'Dolphin', points: 15 },
    { id: 4, color: 'yellow', image: 'https://cdn0.iconfinder.com/data/icons/isometric-farm-animals/160/dog-01-512.png', name: 'Dog', points: 10 },
    { id: 5, color: 'pink', image: 'https://cdn0.iconfinder.com/data/icons/isometric-farm-animals/160/sheep-01-512.png', name: 'Sheep', points: 5 },
    { id: 6, color: 'purple', image: 'https://cdn3.iconfinder.com/data/icons/oldschool_babasse/Png/Software/old-thunderbird-v2.png', name: 'Eagle', points: 5 },
    { id: 7, color: 'gray', image: 'https://cdn4.iconfinder.com/data/icons/BRILLIANT/animals/png/256/zebra.png', name: 'Zebra', points: 5 },
    { id: 8, color: 'brown', image: 'https://cdn2.iconfinder.com/data/icons/animals/256/Elephant.png', name: 'Elephant', points: 10 },

];

const GameScreen: React.FC = () => {
    const [cards, setCards] = useState<Card[]>(cardData);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [clickCounter, setClickCounter] = useState<number>(0);
    const [isGameWon, setIsGameWon] = useState<boolean>(false);
    const [isGameLost, setIsGameLost] = useState<boolean>(false);

    useEffect(() => {
        if (clickCounter === 5) {
            if (totalPoints >= 50) {
                setIsGameWon(true);
            } else {
                setIsGameLost(true);
            }
        }
    }, [clickCounter, totalPoints]);

    const handleCardClick = (card: Card) => {
        if (!isGameWon && !isGameLost) {
            const pointsEarned = card.points;
            setTotalPoints((prevPoints) => prevPoints + pointsEarned);
            setClickCounter((prevCounter) => prevCounter + 1);
        }
    };

    const handleStartAgain = () => {
        // Shuffle the card data and update point values randomly
        const shuffledCards = [...cardData].sort(() => Math.random() - 0.5);
        shuffledCards.forEach((card) => {
            card.points = Math.floor(Math.random() * 20) + 1; // Random point values (1 to 20)
        });

        setCards(shuffledCards);
        setTotalPoints(0);
        setClickCounter(0);
        setIsGameWon(false);
        setIsGameLost(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text>Total Points: {totalPoints}</Text>
                <TouchableOpacity
                    style={styles.startAgainButton}
                    onPress={handleStartAgain}
                >
                    <Text>Start Again</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.cardContainer} showsVerticalScrollIndicator={false}>
                {cards.map((card) => (
                    <TouchableOpacity
                        key={card.id}
                        style={[styles.card, { backgroundColor: card.color }]}
                        onPress={() => handleCardClick(card)}
                        disabled={isGameWon || isGameLost}
                    >
                        <Image source={{ uri: card.image }} style={styles.cardImage} />
                        <Text style={styles.cardText}>{card.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {isGameWon && (
                <View>
                    <Text style={styles.gameResultText}>You won! 🎉</Text>
                    {isGameWon && (
                <ConfettiCannon
                    count={200}
                    origin={{ x: -10, y: 0 }}
                    autoStart={true}
                    explosionSpeed={300}
                    fadeOut
                />
            )}
                </View>
            )}
            {isGameLost && (
                <View>
                    <Text style={styles.gameResultText}>You lost. 😞 Try again!</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        gap: 10,
        borderBottomColor: '#ccc',
    },
    totalPointsText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    startAgainButton: {
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    card: {
        width: 100,
        height: 130,
        aspectRatio: 1, // Ensures a square aspect ratio
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
    },
    cardImage: {
        width: '60%',
        aspectRatio: 1, // Ensures a square aspect ratio
        marginBottom: 10,
    },
    cardText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gameResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    },
});



export default GameScreen;